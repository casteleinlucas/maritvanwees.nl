import net from 'node:net'

// Signals PM2 that this process is accepting connections, so `pm2 start` / `startOrReload` only
// call a deploy done once the site actually answers.
//
// Nitro's node-server preset calls server.listen() in its own entry and exposes no runtime
// "listening" hook, and this plugin runs *before* that call — so it patches listen() to catch the
// server on its way up and signals from that server's own 'listening' event.
//
// It deliberately does not poll the port with a self-connect, which is what this file used to do.
// That answers "is anything listening here", not "am I listening": a second PM2 app holding :3000
// answered every probe, so this process reported ready without ever binding, and PM2 showed a
// green 'online' for deploys that changed nothing at all.
//
// No-op when not running under PM2, which is what keeps this inert in Docker and in `nuxt preview`.
export default defineNitroPlugin(() => {
  if (typeof process.send !== 'function') return

  const listen = net.Server.prototype.listen

  // If Nitro ever starts listening before its plugins run, the patch below never fires and PM2
  // would just time out on a silent process. Say so in the log instead — this file failing
  // quietly is precisely what made a broken deploy look like a successful one.
  const unheard = setTimeout(() => {
    console.error('[pm2-ready] nothing started listening — PM2 will not be told this is ready')
  }, 9000) // stay under PM2 listen_timeout (10s)

  net.Server.prototype.listen = function (this: net.Server, ...args: unknown[]) {
    // the first server up is Nitro's own; restore at once so nothing later gets patched
    net.Server.prototype.listen = listen

    this.once('listening', () => {
      clearTimeout(unheard)
      process.send!('ready')
    })

    return (listen as (...listenArgs: unknown[]) => net.Server).apply(this, args)
  } as typeof net.Server.prototype.listen
})

// PM2 process definition for the Ploi-managed droplet. Mirrors poespasser-web and simplepark-web-v3,
// so all Nuxt apps on the droplet are operated the same way. Docker ignores this file — the image
// runs the nitro server directly (see Dockerfile).
module.exports = {
  apps: [
    {
      name: 'maritvanwees-nl',
      script: './.output/server/index.mjs',

      // Fork rather than cluster: .output/server/index.mjs is ESM, and PM2's cluster container
      // never gets it to bind the port — the app sits at "online" while nothing listens. With
      // instances: 1 the only thing cluster bought was `pm2 reload` swapping workers, so this
      // trades a second or two of downtime per deploy for a deploy that actually takes effect.
      //
      // wait_ready still earns its keep: server/plugins/pm2-ready.ts signals only once this
      // process's own listener is up, so a port already held by something else fails the deploy
      // loudly instead of reporting success.
      exec_mode: 'fork',
      instances: 1,
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
      max_memory_restart: '200M',

      // Nitro reads its runtime config from real environment variables only, and never from a
      // .env file of its own — so everything the production site needs is spelled out here.
      //
      // Deliberately not env_file: that option is silently ignored by older PM2 releases, which
      // leaves the app running on the defaults in nuxt.config.ts with nothing to show for it.
      env: {
        NODE_ENV: 'production',
        // One port per app on the droplet: poespasser-web holds 3000, simplepark-web 3001. The
        // nginx site Ploi generates for maritvanwees.nl must proxy to this same port.
        PORT: 3002,
        // Loopback only: nginx terminates TLS and is the sole thing that should reach this port.
        // Nitro would otherwise bind 0.0.0.0 and expose the app on the droplet's public IP.
        HOST: '127.0.0.1',

        NUXT_PUBLIC_SITE_URL: 'https://maritvanwees.nl',
      },
    },
  ],
}

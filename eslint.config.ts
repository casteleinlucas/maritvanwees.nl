import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  // never lint generated/build output (nuxt, nitro, vite)
  globalIgnores([
    '**/dist/**',
    '**/.nuxt/**',
    '**/.output/**',
    '**/.data/**',
    '**/node_modules/**',
  ]),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    name: 'app/nuxt-conventions',
    rules: {
      // nuxt uses single-word file-based page/layout/error component names
      'vue/multi-word-component-names': 'off',
    },
  },

  skipFormatting,
)

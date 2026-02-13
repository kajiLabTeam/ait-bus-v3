// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nitro-cloudflare-dev', '@nuxt/eslint'],
  devtools: { enabled: true },

  app: {
    head: {
      title: '愛工大バス時刻案内<非公式>',
      htmlAttrs: {
        lang: 'ja',
      },
    },
  },
  compatibilityDate: '2025-07-15',

  nitro: {
    preset: 'cloudflare_module',

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/modules" as *;',
        },
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
      },
    },
  },
});

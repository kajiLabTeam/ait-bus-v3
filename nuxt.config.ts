// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nitro-cloudflare-dev', '@nuxt/eslint'],
  devtools: { enabled: false },

  app: {
    head: {
      title: '愛工大バス時刻案内<非公式>',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { name: 'description', content: '愛知工業大学のバス時刻案内を非公式に提供しています。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '愛工大バス時刻案内<非公式>' },
        { property: 'og:description', content: '愛知工業大学のバス時刻案内を非公式に提供しています。' },
        { property: 'og:image', content: '/ogp.webp' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '愛工大バス時刻案内<非公式>' },
        { name: 'twitter:description', content: '愛知工業大学のバス時刻案内を非公式に提供しています。' },
        { name: 'twitter:image', content: '/ogp.webp' },
      ],
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
          additionalData: '@use "@/assets/styles/modules" as *;',
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

const appName = '愛工大バス時刻案内<非公式>';
const appNameShort = '愛工大バス時刻案内';
const description = '愛知工業大学のバス時刻案内を非公式に提供しています。';

export default defineNuxtConfig({
  modules: ['nitro-cloudflare-dev', '@nuxt/eslint', '@vite-pwa/nuxt'],
  devtools: { enabled: false },

  app: {
    head: {
      title: appName,
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: appName },
        { property: 'og:description', content: description },
        { property: 'og:image', content: '/ogp.webp' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: appName },
        { name: 'twitter:description', content: description },
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

  typescript: {
    typeCheck: true,
    tsConfig: {
      include: ['../app/types/global.d.ts'],
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

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: appName,
      description: description,
      theme_color: '#326CB3',
      lang: 'ja',
      short_name: appNameShort,
      start_url: '/',
      display: 'standalone',
      background_color: '#5f4d93',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-1024x1024.png',
          sizes: '1024x1024',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: null,
    },
  },
});

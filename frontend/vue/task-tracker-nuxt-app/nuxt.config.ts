// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },

    ssr: false,

    css: [
        '~/assets/styles/_bundle.scss',
    ],

    app: {
        head: {
            charset: 'utf-16',
            viewport: 'width=device-width, initial-scale=1',
        },
        pageTransition: { name: 'bottom', mode: 'out-in' },
    },

    modules: [
        '@nuxtjs/i18n',
        [
            '@vite-pwa/nuxt',
            {
                registerType: 'autoUpdate',
                injectManifest: {
                    globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
                },
                manifest: {
                    theme_color: '#ffffff',
                },
                workbox: {
                    globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
                    navigateFallbackDenylist: [/^\//],
                    runtimeCaching: [
                        {
                            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'google-fonts-cache',
                                expiration: {
                                    maxEntries: 10,
                                    maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                                },
                                cacheableResponse: {
                                    statuses: [0, 200],
                                },
                            },
                        },
                        {
                            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'gstatic-fonts-cache',
                                expiration: {
                                    maxEntries: 10,
                                    maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                                },
                                cacheableResponse: {
                                    statuses: [0, 200],
                                },
                            },
                        },
                    ],
                },
                devOptions: {
                    enabled: process.env.NODE_ENV === 'development',
                    suppressWarnings: true,
                    navigateFallbackAllowlist: [/^\/$/],
                    type: 'module',
                },
            },
        ],
    ],

    i18n: {
        locales: [
            {
                code: 'en',
                iso: 'en-US',
            },
            {
                code: 'ru',
                iso: 'ru-RU',
            },
        ],
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root', // recommended
        },
    },

    router: {
        options: {
            linkActiveClass: '--is-active-link',
            linkExactActiveClass: '--is-exact-link',
        },
    },
});

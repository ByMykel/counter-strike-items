import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
    base: "/counter-strike-items/",
    plugins: [
        vue(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Counter-Strike Items",
                short_name: "CS Items",
                description:
                    "Browse all CS2 and CS:GO skins, knives, gloves, cases, collections, stickers, music kits, and more.",
                theme_color: "#090909",
                background_color: "#090909",
                scope: "/counter-strike-items/",
                start_url: "/counter-strike-items/",
                icons: [
                    {
                        src: "pwa-64x64.png",
                        sizes: "64x64",
                        type: "image/png",
                    },
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "maskable-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern:
                            /^https:\/\/raw\.githubusercontent\.com\/ByMykel\/CSGO-API\/.*/i,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "csgo-api-data",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24,
                            },
                        },
                    },
                    {
                        urlPattern:
                            /^https:\/\/raw\.githubusercontent\.com\/ByMykel\/counter-strike-price-tracker\/.*/i,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "price-tracker-data",
                            expiration: {
                                maxEntries: 5,
                                maxAgeSeconds: 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/rsms\.me\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "inter-font",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                            },
                        },
                    },
                ],
            },
        }),
    ],
    build: {
        target: "es2020",
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules/vue/") || id.includes("node_modules/vue-router/") || id.includes("node_modules/pinia/")) {
                        return "vue-vendor";
                    }
                    if (id.includes("node_modules/@headlessui/vue/") || id.includes("node_modules/@heroicons/vue/")) {
                        return "ui-vendor";
                    }
                    if (id.includes("node_modules/fuse.js/")) {
                        return "search";
                    }
                    if (id.includes("node_modules/axios/") || id.includes("node_modules/lodash.uniqby/")) {
                        return "utils-vendor";
                    }
                    if (id.includes("node_modules/@vueuse/")) {
                        return "vueuse";
                    }
                }
            }
        }
    }
})

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
    base: "/counter-strike-items/",
    plugins: [
        vue(),
        // VitePWA({
        //     registerType: "autoUpdate",
        //     workbox: {
        //         cleanupOutdatedCaches: true,
        //         skipWaiting: true,
        //         clientsClaim: true,
        //     },
        //     includeAssets: [
        //         "favicon.ico",
        //         "apple-touch-icon.png",
        //         "mask-icon.svg"
        //     ],
        //     manifest: {
        //         name: "counter-strike-items",
        //         short_name: "cs-items",
        //         description:
        //             "Browse all CS2 and CS:GO skins, knives, gloves, cases, collections, stickers, music kits, and more.",
        //         theme_color: "#090909",
        //         icons: [
        //             {
        //                 src: "pwa-192x192.png",
        //                 sizes: "192x192",
        //                 type: "image/png"
        //             },
        //             {
        //                 src: "pwa-512x512.png",
        //                 sizes: "512x512",
        //                 type: "image/png"
        //             }
        //         ]
        //     }
        // })
    ],
})

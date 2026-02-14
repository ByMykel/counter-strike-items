import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
    base: "/counter-strike-items/",
    plugins: [
        vue(),
    ],
    build: {
        target: "es2020",
        rollupOptions: {
            output: {
                manualChunks: {
                    "vue-vendor": ["vue", "vue-router", "pinia"],
                    "ui-vendor": ["@headlessui/vue", "@heroicons/vue"],
                    "search": ["fuse.js"],
                    "utils-vendor": ["axios", "lodash.uniqby"],
                    "vueuse": ["@vueuse/core", "@vueuse/components"]
                }
            }
        }
    }
})

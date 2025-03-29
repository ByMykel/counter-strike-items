import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
    history: createWebHashHistory("/counter-strike-items/"),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/HomeView.vue")
        },
        {
            path: "/skins",
            name: "skins",
            component: () => import("../views/SkinsView.vue")
        },
        {
            path: "/stickers",
            name: "stickers",
            component: () => import("../views/StickersView.vue")
        },
        {
            path: "/collections",
            name: "collections",
            component: () => import("../views/CollectionsView.vue")
        },
        {
            path: "/crates",
            name: "crates",
            component: () => import("../views/CratesView.vue")
        },
        {
            path: "/collectibles",
            name: "collectibles",
            component: () => import("../views/CollectiblesView.vue")
        },
        {
            path: "/keys",
            name: "keys",
            component: () => import("../views/KeysView.vue")
        },
        {
            path: "/agents",
            name: "agents",
            component: () => import("../views/AgentsView.vue")
        },
        {
            path: "/patches",
            name: "patches",
            component: () => import("../views/PatchesView.vue")
        },
        {
            path: "/graffiti",
            name: "graffiti",
            component: () => import("../views/GraffitiView.vue")
        },
        {
            path: "/music-kits",
            name: "music-kits",
            component: () => import("../views/MusicKitsView.vue")
        },
        {
            path: "/keychains",
            name: "keychains",
            component: () => import("../views/KeychainsView.vue")
        },
        {
            path: "/base-weapons",
            name: "base-weapons",
            component: () => import("../views/BaseWeaponsView.vue")
        }
    ]
})

export default router

import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
    history: createWebHashHistory("/counter-strike-items/"),
    routes: [
        {
            path: "/",
            name: "latest",
            component: () => import("../views/LatestView.vue")
        },
        {
            path: "/home",
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
            path: "/sticker-slabs",
            name: "sticker-slabs",
            component: () => import("../views/StickerSlabsView.vue")
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
            path: "/charms",
            name: "charms",
            component: () => import("../views/CharmsView.vue")
        },
        {
            path: "/souvenir-charm",
            name: "souvenir-charm",
            component: () => import("../views/SouvenirCharmView.vue")
        },
        {
            path: "/base-weapons",
            name: "base-weapons",
            component: () => import("../views/BaseWeaponsView.vue")
        },
        {
            path: "/highlights",
            name: "highlights",
            component: () => import("../views/HighlightsView.vue")
        },
        {
            path: "/matrix",
            name: "matrix",
            component: () => import("../views/MatrixView.vue")
        }
    ]
})

export default router

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
        }
    ]
})

export default router

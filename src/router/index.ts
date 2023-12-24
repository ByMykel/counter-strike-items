import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/storage-units',
      name: 'storage-units',
      component: () => import('../views/StorageUnitsView.vue')
    }
  ]
})

export default router

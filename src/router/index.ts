import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory('/counter-strike-items/'),
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

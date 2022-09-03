import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('../views/recommend/index.vue')
  },

  {
    path: '/singer',
    name: 'singer',
    component: () => import('../views/singer/index.vue')
  },
  {
    path: '/top-list',
    name: 'topList',
    component: () => import('../views/topList/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/userCenter/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

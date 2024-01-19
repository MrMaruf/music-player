import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: "/about",
    component: AboutView
  },
  {
    path: "/manage",
    component: () => import('@/views/ManageView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router

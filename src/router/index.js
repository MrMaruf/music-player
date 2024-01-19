import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'home'
  },
  {
    path: "/about",
    component: AboutView,
    name: 'about'
  },
  {
    path: "/manage",
    component: () => import('@/views/ManageView.vue'),
    name: 'manage'
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
})

export default router

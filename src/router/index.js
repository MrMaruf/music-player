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
    redirect: { name: 'manage' }
  },
  {
    path: "/manage-music",
    // alias: "/manage",
    component: () => import('@/views/ManageView.vue'),
    name: 'manage',
    beforeEnter: (to, from, next) => {
      console.log('beforeEnter', to, from)
      next()
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    redirect: { name: 'home' }
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
})

// router.beforeEach((to, from, next) => {
//   console.log('beforeEach', to, from)
//   next()
// })

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import { useUserStore } from '@/stores/user'

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
    component: () => import('@/views/ManageView.vue'),
    name: 'manage',
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  // console.log('beforeEach', to, from)
  if (!to.meta.requiresAuth) {
    return next();
  }

  const store = useUserStore();
  if (store.isLoggedIn) {
    return next();
  }
  next({ name: 'home' });
})

export default router

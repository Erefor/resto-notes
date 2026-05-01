import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/pages/LoginView.vue'
import MdViewerPage from '@/pages/MdViewerPage.vue'
import authStore from '@/stores/userStore.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/md-file-viewer/:mdFileId?',
      name: 'MdFileViewer',
      component: MdViewerPage,
      meta: { requireAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = authStore()
  const isLoggedIn = userStore.getUserIsLogged
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'MdFileViewer' })
  }
  return next();
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/pages/LoginView.vue'
import MdViewerPage from '@/pages/MdViewerPage.vue'
import authStore from '@/stores/userStore.ts'

export const ROUTES_DATA = {
  LOGIN: {
    NAME: 'Login',
    path: '/',
  },
  MD_FILE_VIEWER: {
    NAME: 'MdFileViewer',
    path: '/mdFileViewer/:mdFileId?',
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_DATA.LOGIN.path,
      name: ROUTES_DATA.LOGIN.NAME,
      component: LoginView,
      meta: { requireAuth: false },
    },
    {
      path: ROUTES_DATA.MD_FILE_VIEWER.path,
      name: ROUTES_DATA.MD_FILE_VIEWER.NAME,
      component: MdViewerPage,
      meta: { requireAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const userStore = authStore()
  const isLoggedIn = userStore.getUserIsLogged
  if (!isLoggedIn && to.name !== ROUTES_DATA.LOGIN.NAME) {
    return {name: ROUTES_DATA.LOGIN.NAME}
  }
})

export default router

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {AuthData} from '@/types.ts'

export const authStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') ?? '')
  const userData = ref<AuthData | undefined | null>(
    JSON.parse(localStorage.getItem('user-data') as string) as AuthData,
  )

  const getToken = computed<string>(() => token.value)
  const getUserIsLogged = computed<boolean>(() => !!token.value && !!userData?.value)

  function setLoginData(payload: AuthData) {
    userData!.value = structuredClone(payload)
    token.value = payload.session.access_token
    localStorage.setItem('token', token.value)
    localStorage.setItem('user-data', JSON.stringify(payload))
  }

  function logout() {
    token.value = ''
    userData!.value = undefined
    localStorage.removeItem('token')
    localStorage.removeItem('user-data')
  }
  return {
    getToken,
    getUserIsLogged,
    userData,
    setLoginData,
    logout,
  }
})
export default authStore

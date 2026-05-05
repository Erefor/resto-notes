<script setup lang="ts">
import { ref } from 'vue'
import { singUpUser } from '@/composables/useSupabse.ts'
import { useToast } from 'buefy'
import router from '@/router'
import authStore from '@/stores/userStore.ts'
import { ROUTES_DATA } from '@/router'
import type { AuthData } from '@/types.ts'

const Toast = useToast()
const showSpinner = ref(false)
const userStore = authStore()
const loginData = ref({
  email: '',
  password: '',
})

async function login() {
  try {
    showSpinner.value = true
    const response = await singUpUser(loginData.value)
    userStore.setLoginData(response as AuthData)
    showSpinner.value = false
    router.push({name: ROUTES_DATA.MD_FILE_VIEWER.NAME})
  } catch (e) {
    showSpinner.value = false
    Toast.open({ type: 'is-danger', message: 'Vaffanculo, fra...', position: 'is-bottom' })
  }
}
</script>

<template>
  <b-loading is-full-page v-model="showSpinner" />
  <div class="login-main-container">
    <div class="card">
      <div class="card-content">
        <div class="content grid">
          <b-field label="Email">
            <b-input type="text" v-model="loginData.email" />
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="loginData.password" />
          </b-field>
          <b-button type="is-primary" outlined @click="login">Dai</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-main-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    max-width: 400px;
    max-height: 350px;
  }
}
</style>

<script setup lang="ts">
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import authStore from '@/stores/userStore.ts'
import router from '@/router'
import { logoutUser, useGetMdFile } from '@/composables/useSupabse.ts'
import { ref } from 'vue'
import type { MdFileData } from '@/types.ts'

const store = authStore()
const showCreateModal = ref<boolean>(false)
const newMdTitle = ref<string>('Nuova nota')
const selectedMdFile = ref<MdFileData>({ content: '', id: 0, title: "", userOwnerId: "" })
const { mdFileList } = useGetMdFile(store.userData!.user.id)

async function callLogout() {
  try {
    store.logout()
    await logoutUser()
    router.push('/')
  } catch (e) {
    console.log(e)
    return router.push('/')
  }
}
</script>

<template>
  <main class="main-container">
    <aside class="drawer">
      <div class="buttons-column" v-if="mdFileList.length">
        <b-tooltip
          v-for="(data, index) in mdFileList"
          :key="index"
          :label="data.title"
          position="is-right"
        >
          <b-button type="is-dark" @click="selectedMdFile = data">
            <b-icon type="is-success" icon="book"></b-icon>
          </b-button>
        </b-tooltip>
      </div>

      <div
      class="buttons-column">
        <b-tooltip label="Crear una nota nueva" position="is-right">
          <b-button type="is-dark" @click="showCreateModal = true">
            <b-icon type="is-success" icon="plus"></b-icon>
          </b-button>
        </b-tooltip>
        <b-tooltip label="Uscire" position="is-right">
          <b-button type="is-dark">
            <b-icon type="is-success" icon="logout" @click="callLogout"></b-icon>
          </b-button>
        </b-tooltip>
      </div>
    </aside>
    <div class="content">
      <MarkdownEditor :selectedMdFile="selectedMdFile" />
    </div>

    <b-modal
      v-model="showCreateModal"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default>
        <div class="modal-card" style="width: auto">
          <section class="modal-card-body grid">
            <b-field label="Titulo">
              <b-input type="text" :model-value="newMdTitle"> </b-input>
            </b-field>
            <b-button class="w-full" type="is-primary">Vabbe</b-button>
          </section>
        </div>
      </template>
    </b-modal>
  </main>
</template>

<style>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  .drawer {
    width: 70px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    border-right: #48c78e solid 1px;
    .buttons-column{
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
  .content {
    width: calc(100% - 60px);
  }
}
</style>

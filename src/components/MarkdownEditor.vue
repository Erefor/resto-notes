<script setup lang="ts">
import { VueMarkdownIt } from '@f3ve/vue-markdown-it'
import { computed, ref, watch } from 'vue'
import { BTooltip, useToast } from 'buefy'
import type { MdFileData } from '@/types.ts'
import debounce from 'buefy/src/utils/debounce.ts'
import { useDeleteMdFile, useUpdateMdFile } from '@/composables/useSupabse.ts'
import RestoModal from '@/components/RestoModal.vue'

defineEmits(['update:modelValue', 'deleteSuccess'])
const props = defineProps<{ selectedMdFile: MdFileData }>()

const Toast = useToast()
const showEditor = ref<boolean>(false)
const showDeleteNoteModal = ref(false)
const showSpinner = ref(false)
const mdFileData = ref<MdFileData>()

const markdownWidth = computed(() => (showEditor.value ? '50%' : '100%'))
const computedFloatButtonText = computed(() =>
  showEditor.value ? 'Ocultar editor' : 'Mostrar editor',
)

async function dispatchDeleteMdFile() {
  try {
    showSpinner.value = true
    await useDeleteMdFile(mdFileData.value!.id)
    showEditor.value = false
    Toast.open({ type: 'is-success', message: `Vabbe`, position: 'is-bottom' })
    showSpinner.value = false
  } catch (e) {
    Toast.open({ type: 'is-success', message: `Vabbe`, position: 'is-bottom' })
    showEditor.value = false
  }
}

const update = debounce(() => {
  useUpdateMdFile(mdFileData.value!.content, mdFileData.value!.id)
}, 1000)

watch(
  () => props.selectedMdFile,
  () => (mdFileData.value = props.selectedMdFile),
)
</script>

<template>
  <div class="markdown-container">
    <b-loading is-full-page v-model="showSpinner" />
    <RestoModal width="120" v-model="showDeleteNoteModal">
      <b-button type="is-danger" @click="dispatchDeleteMdFile">Eliminar nota</b-button>
      <b-button @click="showDeleteNoteModal = false">Cancelar</b-button>
    </RestoModal>
    <textarea
      v-if="showEditor"
      @input="update"
      class="markdown-editor"
      v-model="mdFileData!.content"
    />
    <div v-if="mdFileData" class="markdown"><VueMarkdownIt :source="mdFileData.content" /></div>
    <div v-if="mdFileData" class="floating-buttons-container">
      <b-tooltip position="is-left" class="float-button" :label="computedFloatButtonText">
        <b-button size="is-medium" @click="showEditor = !showEditor" rounded type="is-dark">
          <b-icon type="is-success" icon="eye"></b-icon>
        </b-button>
      </b-tooltip>
      <b-tooltip
        v-if="!mdFileData?.content"
        position="is-left"
        class="float-button"
        label="Elimina nota"
      >
        <b-button @click="showDeleteNoteModal = true" rounded type="is-dark">
          <b-icon type="is-danger" icon="delete"></b-icon>
        </b-button>
      </b-tooltip>
    </div>
  </div>
</template>

<style scoped>
.markdown-container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .markdown-editor {
    width: 50%;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    border-right: #48c78e solid 1px;
    padding: 12px;
  }
  .markdown {
    padding: 12px;
    width: v-bind(markdownWidth);
  }
  .floating-buttons-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }
}
</style>

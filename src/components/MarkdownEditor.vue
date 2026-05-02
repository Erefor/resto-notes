<script setup lang="ts">
import { VueMarkdownIt } from '@f3ve/vue-markdown-it'
import { computed, ref, watch } from 'vue'
import { BTooltip } from 'buefy'
import type { MdFileData } from '@/types.ts'
import debounce from 'buefy/src/utils/debounce.ts'
import { useUpdateMdFile } from '@/composables/useSupabse.ts'

defineEmits(['update:modelValue'])
const props = defineProps<{ selectedMdFile: MdFileData }>()

const showEditor = ref<boolean>(false)
const mdFileData = ref<MdFileData>()

const markdownWidth = computed(() => (showEditor.value ? '50%' : '100%'))
const computedFloatButtonText = computed(() =>
  showEditor.value ? 'Ocultar editor' : 'Mostrar editor',
)

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
    <textarea
      v-if="showEditor"
      @input="update"
      class="markdown-editor"
      v-model="mdFileData!.content"
    />
    <div v-if="mdFileData" class="markdown"><VueMarkdownIt :source="mdFileData.content" /></div>
    <div class="floating-buttons-container">
      <b-tooltip position="is-left" class="float-button" :label="computedFloatButtonText">
        <b-button size="is-medium" @click="showEditor = !showEditor" rounded type="is-dark">
          <b-icon type="is-success" icon="eye"></b-icon>
        </b-button>
      </b-tooltip>
      <b-tooltip position="is-left" class="float-button" label="Elimina nota">
        <b-button @click="showEditor = !showEditor" rounded type="is-dark">
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
    position: absolute;
    bottom: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }
}
</style>

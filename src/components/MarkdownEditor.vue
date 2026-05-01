<script setup lang="ts">
import { VueMarkdownIt } from '@f3ve/vue-markdown-it'
import { computed, ref } from 'vue'
import { BTooltip } from 'buefy'

const showEditor = ref(false)

const noteData = ref({
  id: 1,
  content: '# Hello World',
})

const markdownWidth = computed(() => (showEditor.value ? '50%' : '100%'))
const computedFloatButtonText = computed(() => showEditor.value ? 'Ocultar editor' : 'Mostrar editor')
</script>

<template>
  <div class="markdown-container">
    <textarea v-if="showEditor" class="markdown-editor" v-model="noteData.content" />
    <div class="markdown"><VueMarkdownIt :source="noteData.content" /></div>
    <b-tooltip position="is-left" class="float-button" :label="computedFloatButtonText">
      <b-button @click="showEditor = !showEditor" rounded type="is-dark">
        <b-icon type="is-success" icon="eye"></b-icon>
      </b-button>
    </b-tooltip>
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
    width:v-bind(markdownWidth);
  }
  .float-button {
    position: absolute;
    bottom: 24px;
    right: 24px;
    color: white;
  }
}
</style>

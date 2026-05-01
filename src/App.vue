<script setup lang="ts">
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import { BTooltip } from 'buefy'
</script>

<template>
  <main class="main-container">
    <aside class="drawer">
      <b-tooltip label="Crear una nota nueva" position="is-right">
        <b-button type="is-dark">
          <b-icon type="is-success" icon="plus"></b-icon>
        </b-button>
      </b-tooltip>
    </aside>
    <div class="content">
      <MarkdownEditor />
    </div>
  </main>
</template>

<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  .drawer {
    width: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    border-right: #48c78e solid 1px;
  }
  .content {
    width: calc(100% - 60px);
  }
}
</style>

<script setup lang="ts"></script>

<template>
  <b-modal>
    <form action="">
      <div class="modal-card" style="width: auto">
        <section class="modal-card-body">
          <slot name="default" />
        </section>
      </div>
    </form>
  </b-modal>
</template>

<style scoped></style>

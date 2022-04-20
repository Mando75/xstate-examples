<script setup lang="ts">

import { defineProps } from "vue";
import { FormContext } from "./form.machine";

const props = defineProps<{ context: FormContext}>()
const emit = defineEmits<{
  (e: 'edit'): void
}>()

</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3>{{ context.displayName }}</h3>
      <h6>{{ context.email }}</h6>
    </div>
    <div class="card-body">
      <p>{{ context.quote }}</p>
    </div>
    <button @click="emit('edit')">Edit</button>
  </div>
</template>

<style>
.card {
  border: solid 1px black;
  border-radius: 4px;
  max-width: 500px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>

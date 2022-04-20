<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { FormContext } from "./form.machine";

const props = defineProps<{ context: FormContext}>();

const emit = defineEmits<{
  (e:'save', value: FormContext): void,
  (e: 'cancel'): void
}>()

const dirtyState = reactive({...props.context})
const {displayName, email, quote} = toRefs(dirtyState)

function onSubmit(e: Event) {
  e.preventDefault();
  emit('save', {...dirtyState})
}

function onCancel() {
  emit('cancel')
}


</script>

<template>
  <form @submit="onSubmit" @reset="onCancel">
    <div class="form-group">
      <label for="displayName">Display Name</label>
      <input type="text" class="form-control" id="displayName" v-model="displayName" placeholder="Display Name">
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" v-model="email" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="quote">Quote</label>
      <textarea class="form-control" id="quote" v-model="quote" rows="3"></textarea>
    </div>
    <div class="button-group">
      <button type="submit">Save</button>
      <button type="reset">Cancel</button>
    </div>
  </form>
</template>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .button-group {
    display: flex;
    gap: 10px;
  }
</style>

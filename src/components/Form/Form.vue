<script setup lang="ts">
import { useMachine } from "@xstate/vue";
import { createFormMachine, FormContext,  } from "./form.machine";
import { computed, reactive, toRefs } from "vue";
import Display from "./Display.vue";
import Inputs from "./Inputs.vue";

const initialContext: FormContext = {
  displayName: 'Bryan',
  email: 'abc@acme.com',
  quote: 'This cannot continue'
}

const formMachine = createFormMachine(initialContext);
const { state, send} = useMachine(formMachine)

const context = computed(() => state.value.context)

</script>

<template>
  <h1>Form</h1>
  <p>state: {{state.value}}</p>
  <div class="wrapper" >
    <Display
      v-if="state.value === 'viewing'"
      :context="context"
      @edit="send('EDIT')"
    />
    <Inputs
      v-else-if="state.value === 'editing'"
      :context="context"
      @save="send('SAVE', { data: $event})"
      @cancel="send('CANCEL')"
    />
    <p v-else-if="state.value === 'submitting'">
      Saving...
    </p>
    <p v-else-if="state.value === 'error'">
      There was an error processing the request
    </p>
  </div>
</template>

<style scoped>
.wrapper {
  margin: auto;
  max-width: 500px;
  flex-direction: column;
  display: flex;
  place-content: center;
  gap: 10px;
}
</style>

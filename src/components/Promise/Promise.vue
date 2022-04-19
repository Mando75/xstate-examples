<script setup lang="ts">
import { promiseMachine } from "./promise-machine";
import { useMachine } from "@xstate/vue";

const { state, send } = useMachine(promiseMachine);

const startPromise = (shouldReject: boolean) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject("error");
      } else {
        resolve("success");
      }
    }, 1000);
  })
    .then(() => send("RESOLVE"))
    .catch(() => send("REJECT"));
</script>

<template>
  <h1>Promise</h1>
  <div id="promise">
    <span>State: {{ state.value }}</span>
    <div id="btns">
      <button class="btn" @click="startPromise(false)">Start (success)</button>
      <button class="btn" @click="startPromise(true)">Start (error)</button>
    </div>
  </div>
</template>

<style scoped>
#promise {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#btns {
  display: flex;
  flex-direction: row;
  place-content: center;
  gap: 10px;
}

.btn {
  padding: 10px;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
</style>

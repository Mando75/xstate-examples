<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Promise from "./components/Promise/Promise.vue";
import Home from "./components/Home.vue";
import { computed, ref } from "vue";

type Page = typeof Home | typeof Promise;

const routes: Record<string, Page> = {
  "/": Home,
  "/promise": Promise,
};

const currentPath = ref(window.location.hash);
window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(
  () => routes[currentPath.value.slice(1) ?? "/"] ?? Home
);
</script>

<template>
  <div id="links">
    <a href="#/">Home</a>
    <a href="#/promise">Promise</a>
  </div>
  <component :is="currentView" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#links {
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  place-content: center;
}
</style>

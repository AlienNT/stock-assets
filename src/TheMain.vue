<script setup lang="ts">
import {onMounted} from "vue";
import {setCSSProperty} from "@/helpers/formatHelper.ts";

onMounted(() => {
  setCSSProperty("--vh", `${window.innerHeight}px`)
  document.head.insertAdjacentHTML("afterbegin",
      `
    <meta name="theme-color" content="#f6f8fa" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">`
  )
})

</script>

<template>
  <main class="main">
    <router-view v-slot="{Component}">
      <component :is="Component"/>
    </router-view>
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  min-height: var(--vh);
}
</style>
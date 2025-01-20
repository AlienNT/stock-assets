<script setup lang="ts">
import {onMounted} from "vue";
import {setCSSProperty} from "@/helpers/formatHelper.ts";

onMounted(() => {
  setCSSProperty("--vh", `${window.innerHeight}px`)
})
</script>

<template>
  <main class="main">
    <router-view v-slot="{Component}">
      <transition name="router" appear mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  min-height: calc(var(--vh) - var(--headerH));
}
</style>
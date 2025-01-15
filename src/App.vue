<script setup lang="ts">
import TheMain from "@/TheMain.vue";
import TheHeader from "@/TheHeader.vue";
import {onBeforeUnmount, onMounted} from "vue";
import {useUtils} from "@/composables/useUtils.ts";

const {setIsMobileDevice, setIsMobileScreen} = useUtils()

onMounted(() => {
  setIsMobileScreen();
  setIsMobileDevice()

  addEventListener("resize", () => setIsMobileScreen());
})

onBeforeUnmount(() => {
  removeEventListener("resize", () => setIsMobileScreen());
})
</script>

<template>
  <TheHeader/>
  <TheMain/>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

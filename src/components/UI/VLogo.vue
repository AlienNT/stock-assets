<script setup lang="ts">
import VImage from "@/components/UI/VImage.vue";

export interface LogoPropsInterface {
  src?: string;
  link?: string;
}

withDefaults(defineProps<LogoPropsInterface>(), {
  src: '',
  link: '/',
})
</script>

<template>
  <div class="logo">
    <router-link :to="link">
      <VImage
          min-width="50px"
          min-height="50px"
          :background="`#ccc`"
          :src="src"
          alt="logo"
      />
    </router-link>
  </div>
</template>

<style scoped lang="scss">

</style>
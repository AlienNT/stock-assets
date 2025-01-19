<script setup lang="ts">
import VImage from "@/components/UI/VImage.vue";
import imagesHelper from "@/helpers/imagesHelper.ts";

export interface LogoPropsInterface {
  src?: string;
  link?: string;
  background?: string;
}

withDefaults(defineProps<LogoPropsInterface>(), {
  src: imagesHelper.LOGO,
  link: '/',
  background: 'transparent',
})
</script>

<template>
  <div class="logo">
    <router-link :to="link">
      <VImage
          min-width="50px"
          min-height="50px"
          :background="background"
          :src="src"
          alt="logo"
      />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.logo {
  max-width: 150px;
}
</style>
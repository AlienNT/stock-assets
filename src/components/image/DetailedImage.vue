<script setup lang="ts">
import {ImageHitInterface} from "@/types/ImageTypes.ts";
import VImage from "@/components/UI/VImage.vue";

export interface DetailedImageProps extends ImageHitInterface {
}

defineProps<DetailedImageProps>()
</script>

<template>
<div class="detailed-image">
  <VImage
      :src="webformatURL"
      :background="'transparent'"
      alt="image"
  />
</div>
</template>

<style scoped lang="scss">
.detailed-image {
  flex: 1;
  display: flex;
}
</style>
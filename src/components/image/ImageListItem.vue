<script setup lang="ts">
import {ImageHitInterface} from "@/types/ImageTypes.ts";
import ImageItem from "@/components/image/ImageItem.vue";

export interface ImageListItemPropsInterface extends ImageHitInterface {
}

defineProps<ImageListItemPropsInterface>()

</script>

<template>
  <router-link
      class="image-list-item"
      :to="`images/${id}`"
  >
    <ImageItem
        :id="id"
        :preview-u-r-l="previewURL"
        :webformat-u-r-l="webformatURL"
        :preview-width="previewWidth"
        :preview-height="previewHeight"
    />
  </router-link>
</template>

<style scoped lang="scss">
.image-list-item {
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(220, 220, 220, 0.47);
  transition: .2s ease;
}
</style>
<script setup lang="ts">
import {ImageHitInterface} from "@/types/ImageTypes.ts";
import ImageItem from "@/components/image/ImageItem.vue";

export type ImageListItemPropsInterface = ImageHitInterface

defineProps<ImageListItemPropsInterface>()
defineEmits(['onTagClick'])

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
        :tags="tags"
        :views="views"
        :downloads="downloads"
        :likes="likes"
        @on-tag-click="e => $emit('onTagClick', e)"
    />
  </router-link>
</template>

<style scoped lang="scss">
.image-list-item {
  display: flex;
  width: 100%;
  height: 100%;
  transition: .2s ease;
  > * {
    flex: 1;
  }
}
</style>
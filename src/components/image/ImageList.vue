<script setup lang="ts">
import MasonryTemplate from "@/templates/MasonryTemplate.vue";
import ImageListItem from "@/components/image/ImageListItem.vue";
import {ImageHitInterface} from "@/types/ImageTypes.ts";
import {calcHeight} from "@/helpers/templateHelper.ts";
import {useConfig} from "@/composables/useConfig.ts";

export interface ImageListPropsInterface {
  images: ImageHitInterface[]
}

defineProps<ImageListPropsInterface>()
const emit = defineEmits(['onScrolled'])

const {appConfig} = useConfig()

function calcItemHeight(item: ImageHitInterface, itemWidth: number): number {
  return calcHeight({
    width: item.previewWidth,
    height: item.previewHeight,
    itemWidth
  })
}
</script>

<template>
  <div class="image-list">
    <MasonryTemplate
        :items="images"
        :max-column-count="appConfig.IMAGE_LIST_COLUMNS_MAX"
        :min-column-count="appConfig.IMAGE_LIST_COLUMNS_MIN"
        :gap="appConfig.IMAGE_LIST_GAP"
        :calc-item-height="calcItemHeight"
        @on-scrolled="emit('onScrolled')"
    >
      <template #content="{item}: {item: ImageHitInterface}">
        <ImageListItem
            :id="item.id"
            :views="item.views"
            :preview-width="item.previewWidth"
            :preview-height="item.previewHeight"
            :preview-u-r-l="item.previewURL"
            :webformat-u-r-l="item.webformatURL"
        />
      </template>
    </MasonryTemplate>
  </div>
</template>

<style scoped lang="scss">

</style>
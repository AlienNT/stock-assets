<script setup lang="ts">
import MasonryTemplate from "@/templates/MasonryTemplate.vue";
import ImageListItem from "@/components/image/ImageListItem.vue";
import {ImageHitInterface} from "@/types/ImageTypes.ts";
import {calcHeight} from "@/helpers/templateHelper.ts";
import {useConfig} from "@/composables/useConfig.ts";
import {useSearch} from "@/composables/useSearch.ts";

export interface ImageListPropsInterface {
  images: ImageHitInterface[],
  isLoading: boolean;
}

defineProps<ImageListPropsInterface>()
const emit = defineEmits(['onScrolled'])

const {appConfig} = useConfig()
const {setSearchQuery} = useSearch()

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
        :is-loading="isLoading"
        :calc-item-height="calcItemHeight"
        @on-scrolled="emit('onScrolled')"
    >
      <template #content="{item}: {item: ImageHitInterface}">
        <ImageListItem
            :id="item.id"
            :views="item.views"
            :downloads="item.downloads"
            :likes="item.likes"
            :preview-width="item.previewWidth"
            :preview-height="item.previewHeight"
            :preview-u-r-l="item.previewURL"
            :webformat-u-r-l="item.webformatURL"
            :tags="item.tags"
            @on-tag-click="tag => setSearchQuery(tag)"
        />
      </template>
    </MasonryTemplate>
  </div>
</template>

<style scoped lang="scss">
.image-list {
  flex: 1;
}
</style>
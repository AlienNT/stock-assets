<script setup lang="ts">
import {VideoHitInterface} from "@/types/VideoTypes.ts";
import VideoListItem from "@/components/video/VideoListItem.vue";
import MasonryTemplate from "@/templates/MasonryTemplate.vue";

import {calcHeight} from "@/helpers/templateHelper.ts";
import {useConfig} from "@/composables/useConfig.ts";
import {useSearch} from "@/composables/useSearch.ts";

export interface VideoListPropsInterface {
  videos: VideoHitInterface[],
  isLoading: boolean,
}

defineProps<VideoListPropsInterface>()

const emit = defineEmits(['onScrolled'])

const {appConfig} = useConfig()
const {setSearchQuery} = useSearch()

function calcItemHeight(item: VideoHitInterface, itemWidth: number): number {
  return calcHeight({
    width: item.videos?.tiny?.width,
    height: item.videos?.tiny?.height,
    itemWidth
  })
}

</script>

<template>
  <div class="video-list">
    <MasonryTemplate
        :items="videos"
        :max-column-count="appConfig.VIDEO_LIST_COLUMNS_MAX"
        :min-column-count="appConfig.VIDEO_LIST_COLUMNS_MIN"
        :gap="appConfig.VIDEO_LIST_GAP"
        :calc-item-height="calcItemHeight"
        :is-loading="isLoading"
        @on-scrolled="emit('onScrolled')"
    >
      <template #content="{item}: {item: VideoHitInterface}">
        <VideoListItem
            class="video-list-item"
            :videos="item.videos"
            :comments="item.comments"
            :downloads="item.downloads"
            :duration="item.duration"
            :value="item.id"
            :likes="item.likes"
            :user="item.user"
            :user_id="item.user_id"
            :tags="item.tags"
            :type="item.type"
            :views="item.views"
            :id="item.id"
            :page-u-r-l="item.pageURL"
            :user-image-u-r-l="item.userImageURL"
            @on-tag-click="e => setSearchQuery(e)"
        />
      </template>
    </MasonryTemplate>
  </div>
</template>

<style scoped lang="scss">
.video-list {
  flex: 1;
}
</style>
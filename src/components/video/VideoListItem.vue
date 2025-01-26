<script setup lang="ts">
import {VideoHitInterface} from "@/types/VideoTypes.ts";
import VideoItem from "@/components/video/VideoItem.vue";

export type VideoListItemProps = VideoHitInterface

defineProps<VideoListItemProps>()

const emit = defineEmits(['onTagClick'])

</script>

<template>
  <router-link
      :to="'videos/'+id"
      class="video-list-item"
  >
    <VideoItem
        :type="type"
        :tags="tags"
        :duration="duration"
        :videos="videos"
        :likes="likes"
        :downloads="downloads"
        :views="views"
        @on-tag-click="tag => emit('onTagClick', tag)"
    />
  </router-link>
</template>
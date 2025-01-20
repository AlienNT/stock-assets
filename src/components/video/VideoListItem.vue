<script setup lang="ts">
import {VideoHitInterface} from "@/types/VideoTypes.ts";
import VideoItem from "@/components/video/VideoItem.vue";

export interface VideoListItemProps extends VideoHitInterface {
}

defineProps<VideoListItemProps>()

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
    />
  </router-link>
</template>
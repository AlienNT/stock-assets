<script setup lang="ts">
import {useVideoStore} from "@/store/videoStore.ts";
import {useConfig} from "@/composables/useConfig.ts";

import VideoList from "@/components/video/VideoList.vue";
import AssetsPageTemplate from "@/templates/AssetsPageTemplate.vue";

const {videos, fetchVideos, totalVideos, resetStore, page, setPage} = useVideoStore()
const {appConfig} = useConfig()
const {request, isLoading} = fetchVideos()

interface SlotInterface {
  events: {
	onScrolled: (event?: MouseEvent) => void;
  }
}
</script>

<template>
  <AssetsPageTemplate
	  :per-page="appConfig.VIDEO_REQUEST_PER_PAGE"
	  :page="page"
	  :set-next-page="() => setPage(page + 1)"
	  :request="request"
	  :reset="resetStore"
	  :items-count="videos.length"
	  :is-loading="isLoading"
	  :total="totalVideos"
      poster-src="/video/bg_tiny.mp4"
      title="Search free stock video footage & clips"
      class="videos-page"
      poster-type="video"
      is-show-poster
  >
    <template
		#content="{events}: SlotInterface"
	>
      <VideoList
          :videos="videos"
          :is-loading="isLoading"
          @on-scrolled="events.onScrolled"
      />
    </template>
  </AssetsPageTemplate>
</template>

<style scoped lang="scss">
@use '../assets/css/animations.scss';

.video-loader {
  padding-top: 20px;
  padding-bottom: 20px;
  transition: .5s ease;
}


</style>
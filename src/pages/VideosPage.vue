<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import {useVideoStore} from "@/store/videoStore.ts";
import {isLastPage} from "@/helpers/requestHelper.ts";
import {useConfig} from "@/composables/useConfig.ts";
import {useSearch} from "@/composables/useSearch.ts";

import VideoList from "@/components/video/VideoList.vue";
import VPoster from "@/components/UI/VPoster.vue";


const {videos, fetchVideos, totalVideos, resetStore} = useVideoStore()
const {appConfig} = useConfig()
const {searchQuery} = useSearch()
const {request, isLoading} = fetchVideos()

const state = reactive({
  page: 1,
  perPage: appConfig.value.VIDEO_REQUEST_PER_PAGE,
})

onMounted(() => {
  if (!videos.value.length) {
    loadVideos()
  }
})

const canLoadMore = computed(() => {
  return !videos.value.length || !isLastPage({
    perPage: appConfig.value.VIDEO_REQUEST_PER_PAGE,
    page: state.page,
    total: totalVideos.value
  })
})

function onScrolled() {
  if (!canLoadMore.value || isLoading.value) return;

  setNextPageNumber()
  loadVideos()
}

function loadVideos() {
  request({
    per_page: appConfig.value.VIDEO_REQUEST_PER_PAGE,
    page: state.page,
  })
}

function setNextPageNumber(page?: number) {
  state.page = page || state.page + 1;
}

function resetPageNumber() {
  state.page = 1;
}


watch(() => searchQuery.value, (value, oldValue) => {
  if (value && value !== oldValue) {
    console.log({value, oldValue})
    resetPageNumber()
    resetStore()
    loadVideos()
  }
})

</script>

<template>
  <VPoster
      poster-type="video"
      src="public/video/bg_tiny.mp4"
      title="Search free stock video footage & clips"
  />
  <section class="videos-page">
    <div class="container">
      <div class="row">
        <VideoList
            :videos="videos"
            @on-scrolled="onScrolled"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/css/animations.scss';

.videos-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-loader {
  padding-top: 20px;
  padding-bottom: 20px;
  transition: .5s ease;
}


</style>
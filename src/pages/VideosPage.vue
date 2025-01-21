<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import {useVideoStore} from "@/store/videoStore.ts";
import {isLastPage} from "@/helpers/requestHelper.ts";
import {useConfig} from "@/composables/useConfig.ts";
import {useSearch} from "@/composables/useSearch.ts";

import VideoList from "@/components/video/VideoList.vue";
import AssetsPageTemplate from "@/templates/AssetsPageTemplate.vue";


const {videos, fetchVideos, totalVideos, resetStore} = useVideoStore()
const {appConfig} = useConfig()
const {searchQuery} = useSearch()
const {request, isLoading} = fetchVideos()

const state = reactive({
  page: 1,
  perPage: appConfig.value.VIDEO_REQUEST_PER_PAGE,
  isListInViewport: false,
})

onMounted(() => {
  if (!videos.value.length && state.isListInViewport) {
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
  return request({
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

function onIntersected(value: boolean) {
  if (value && !videos.value.length) {
    loadVideos()
  }
  state.isListInViewport = value;
}

watch(() => searchQuery.value, (value, oldValue) => {
  if (value && value !== oldValue) {
    resetPageNumber()
    resetStore()
    loadVideos()
  }
})

</script>

<template>
  <AssetsPageTemplate
      poster-src="public/video/bg_tiny.mp4"
      title="Search free stock video footage & clips"
      class="videos-page"
      poster-type="video"
      is-show-poster
      @on-intersected="onIntersected"
  >
    <template #content>
      <VideoList
          :videos="videos"
          :is-loading="isLoading"
          @on-scrolled="onScrolled"
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
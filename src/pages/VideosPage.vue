<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import {useVideoStore} from "@/store/videoStore.ts";
import {useUtils} from "@/composables/useUtils.ts";
import {isLastPage} from "@/helpers/requestHelper.ts";
import {useConfig} from "@/composables/useConfig.ts";
import VideoList from "@/components/video/VideoList.vue";


const {videos, fetchVideos, totalVideos, resetStore} = useVideoStore()
const {appConfig} = useConfig()

const state = reactive({
  page: 1,
  perPage: appConfig.value.VIDEO_REQUEST_PER_PAGE,
})

onMounted(() => {
  if (!videos.value.length) {
    loadVideos()
  }
})

function onScrolled() {
  state.page += 1
  loadVideos()
}

const {request, isLoading} = fetchVideos()
const {searchQuery} = useUtils()

const canLoadMore = computed(() => {
  return !videos.value.length || !isLastPage({
    perPage: appConfig.value.VIDEO_REQUEST_PER_PAGE,
    page: state.page,
    total: totalVideos.value
  })
})

function loadVideos() {
  if (isLoading.value || !canLoadMore.value) return;

  request({
    per_page: appConfig.value.VIDEO_REQUEST_PER_PAGE,
    page: state.page,
  })
}

watch(() => searchQuery.value, (value, oldValue) => {
  if (value && value !== oldValue) {
    console.log({value, oldValue})
    state.page = 1
    resetStore()
    loadVideos()
  }
})

</script>

<template>
  <section class="videos-page">
    <div class="container">
      <VideoList
          v-if="videos.length"
          :videos="videos"
          @on-scrolled="onScrolled"
      />
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
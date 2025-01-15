<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {useVideoStore} from "@/store/videoStore.ts";
import VideoList from "@/components/video/VideoList.vue";
import LoaderDotted from "@/components/UI/LoaderDotted.vue";


const {videos, fetchVideos, totalVideos} = useVideoStore()

const state = reactive({
  page: 1,
  perPage: 10,
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

function loadVideos() {
  if (totalVideos.value <= state.page * state.perPage) return;

  request({
    per_page: state.perPage,
    page: state.page,
  })
}

</script>

<template>
  <section class="videos-page">
    <div class="container">
      <VideoList
          :videos="videos"
          @on-scrolled="onScrolled"
      />
      <transition appear name="fade">
        <LoaderDotted
            v-if="isLoading"
            class="video-loader"
        />
      </transition>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/css/animations.scss';
.video-loader{
  position: fixed;
  z-index: 3;
  bottom: 15px;
  left: 0;
  transition: .5s ease;
}
</style>
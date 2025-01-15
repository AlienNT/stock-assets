<script setup lang="ts">
import {VideoHitInterface} from "@/types/VideoTypes.ts";
import {computed, reactive} from "vue";

export interface VideoListItemProps extends VideoHitInterface {
}

const props = defineProps<VideoListItemProps>()

const state = reactive({
  isPlaying: false,
  currentTime: '0:00' as string,
})

const src = computed(() => {
  return props.videos.tiny?.url
})

const styles = computed(() => [
  props.videos.tiny?.width && props.videos.tiny?.height ?
      `padding-top: ${props.videos.tiny?.width / props.videos.tiny?.height * 100}%;` :
      '',
].join('; '))

function onHover(e: MouseEvent) {
  state.isPlaying = true

  const video = e.target as HTMLVideoElement
  if (video.paused) {
    video.play()
  }
}

function onBlur(e: MouseEvent) {
  state.isPlaying = false

  const video = e.target as HTMLVideoElement

  if (video.played) {
    video.pause()
  }
}

function onTimeUpdate(e: Event) {
  const target = e.target as HTMLVideoElement
  state.currentTime = formattedTime(target.currentTime)
}

function formattedTime(number: number): string {
  const minutes = Math.trunc(number / 60) || 0
  const seconds = Math.trunc(number % 60) || 0

  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}
</script>

<template>
  <router-link
      :to="'videos/'+id"
      class="video-list-item"
      :style="styles"
  >
    <div class="video-wrapper">
      <div class="video-content">
        <div class="duration">
          {{ state.currentTime }} / {{ formattedTime(duration) }}
        </div>
        <video
            v-once
            preload="none"
            :poster="videos?.tiny?.thumbnail"
            muted
            loop
            :autoplay="state.isPlaying"
            @mouseenter="onHover"
            @mouseleave="onBlur"
            @timeupdate="onTimeUpdate"
        >
          <source :src="src"/>
        </video>
      </div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.video-list-item {
  width: 0;
  height: 0;
  padding-right: 100%;
  position: relative;
  transition: 0.5s ease;
  background: #cccccc;
  display: flex;

}

.video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //min-width: 200px;
}

.video-content {
  position: relative;
}


.duration {
  position: absolute;
  top: 25px;
  left: 25px;
  color: #ccc;
}

video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}

.show-item {
  video {
    opacity: 1;
  }
}
</style>
<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {useUtils} from "@/composables/useUtils.ts";
import ListItemOverlay from "@/components/UI/overlay/ListItemOverlay.vue";
import {VideoHitInterface} from "@/types/VideoTypes.ts";

export interface VideoItemPropsInterface extends VideoHitInterface {
}

const props = defineProps<VideoItemPropsInterface>()
const emit = defineEmits(['onTagClick'])

const {isMobileDevice} = useUtils()

const state = reactive({
  loaded: false,
  isPlaying: false,
  currentTime: '0:00' as string,
})
const videoElement = ref(null as unknown as HTMLVideoElement)

const video = computed(() => {
  return isMobileDevice.value ? props.videos.tiny : props.videos.tiny
})

function onLoad() {
  state.loaded = true;
}

function onHover(video: HTMLVideoElement) {
  state.isPlaying = true

  if (video.paused) {
    video.play()
  }
}

function onBlur(video: HTMLVideoElement) {
  state.isPlaying = false

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
  <div class="video-item">
    <ListItemOverlay
        :likes="likes"
        :downloads="downloads"
        :views="views"
        :tags="tags"
        class="video-overlay"
        @on-tag-click="tag => emit('onTagClick', tag)"
        @mouseenter="onHover(videoElement)"
        @mouseleave="onBlur(videoElement)"
    >
      <template #listItem>
        <video
            ref="videoElement"
            :poster="video?.thumbnail"
            :autoplay="state.isPlaying"
            v-once
            preload="none"
            muted
            loop
            @timeupdate="onTimeUpdate"
            @load="onLoad"
        >
          <source :src="video?.url"/>
        </video>
      </template>
      <template #customRight>

      </template>
    </ListItemOverlay>
  </div>
</template>
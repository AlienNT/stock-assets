<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {useUtils} from "@/composables/useUtils.ts";
import {formattedQuality, formattedTime} from "@/helpers/formatHelper.ts";

import {VideoHitInterface} from "@/types/VideoTypes.ts";

import OverlayListItem from "@/components/UI/overlay/OverlayListItem.vue";
import VideoItemDetails from "@/components/video/VideoItemDetails.vue";
import VVideo from "@/components/UI/VVideo.vue";

export interface VideoItemPropsInterface extends VideoHitInterface {
}

const props = defineProps<VideoItemPropsInterface>()
const emit = defineEmits(['onTagClick'])

const {isMobileDevice} = useUtils()

const state = reactive({
  loaded: false,
  isPlaying: false,
  currentTime: '0:00' as string,
  playPromise: null as unknown as Promise<void>,
})
const videoElement = ref(null as unknown as HTMLVideoElement)

const video = computed(() => {
  return isMobileDevice.value ? props.videos.tiny : props.videos.tiny
})

const displayedQuality = computed(() => {
  return formattedQuality(props.videos.large?.height || 0)
})

const displayedDuration = computed(() => {
  return state.currentTime + '/' + formattedTime(props.duration)
})

function onLoad() {
  state.loaded = true;
}

function onHover(video: HTMLVideoElement) {
  state.isPlaying = true

  if (video.paused) {
    state.playPromise = video.play()
  }
}

function onBlur(video: HTMLVideoElement) {
  state.isPlaying = false

  if (video.played) {
    state.playPromise.then(() => {
      video.pause()
    })
  }
}

function onTimeUpdate(e: Event) {
  const target = e.target as HTMLVideoElement
  state.currentTime = formattedTime(target.currentTime)
}

function onHTMLElement(e: HTMLElement) {
  videoElement.value = e as HTMLVideoElement
}

</script>

<template>
  <div class="video-item">
    <OverlayListItem
        :likes="likes"
        :downloads="downloads"
        :views="views"
        :tags="tags"
        class="video-overlay"
        @on-tag-click="(tag:string) => emit('onTagClick', tag)"
        @mouseenter="onHover(videoElement)"
        @mouseleave="onBlur(videoElement)"
    >
      <template #listItem>
        <VVideo
            v-if="video?.url"
            :src="video?.url"
            :poster="video?.thumbnail"
            :autoplay="state.isPlaying"
            muted
            loop
            playsinline
            preload="none"
            @on-load="onLoad"
            @on-time-update="onTimeUpdate"
            @on-h-t-m-l-element="onHTMLElement"
        />
          <div class="play" :class="!state.isPlaying && 'play-show'"/>
      </template>
      <template #customRight>
        <VideoItemDetails
            :displayed-quality="displayedQuality"
            :displayed-duration="displayedDuration"
        />
      </template>
    </OverlayListItem>
  </div>
</template>
<style scoped lang="scss">
.video-details {
  align-items: flex-end;
}
.video-item {
  display: flex;
  flex-direction: column;
  position: relative;
}
.play {
  opacity: 0;
  transition: 0.2s ease;
  visibility: hidden;
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  mask: url("../../../public/svg/play-svgrepo-com.svg") no-repeat center / 50px;
}
.play-show {
  opacity: 1;
  visibility: visible;
}
</style>
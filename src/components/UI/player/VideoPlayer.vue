<script setup lang="ts">
import VVideo, {VideoPropsInterface} from "@/components/UI/VVideo.vue";
import {computed, reactive} from "vue";
import {formattedQuality} from "@/helpers/formatHelper.ts";
import VideoProgressBar from "@/components/UI/player/VideoProgressBar.vue";
import {debounce} from "@/helpers/templateHelper.ts";

export interface VideoPlayerPropsInterface extends VideoPropsInterface {
}

export interface VideoPlayerStateInterface {
  fullScreen?: boolean,
  videoElement: HTMLVideoElement,
  currentTime: number,
  duration: number,
  onPlaying?: Promise<void>,
  isHovered?: boolean,
  isPlaying?: boolean,
}

withDefaults(defineProps<VideoPlayerPropsInterface>(), {
  preload: 'auto',
})

const state: VideoPlayerStateInterface = reactive({
  fullScreen: false,
  videoElement: {} as HTMLVideoElement,
  currentTime: 0,
  duration: 0,
  onPlaying: null as unknown as Promise<void>,
  isHovered: false,
  isPlaying: false,
})

const resolution = computed(() => {
  return state.videoElement?.videoHeight ? formattedQuality(state.videoElement.videoHeight) : undefined
})

const isShowControls = computed(() => {
  return !state.isPlaying || state.isHovered
})

function setVideoElement(videoElement: HTMLVideoElement): void {
  state.videoElement = videoElement;
  state.duration = videoElement.duration;
}

function onLoad(e: Event): void {
  setVideoElement(e.target as unknown as HTMLVideoElement);
  alert(JSON.stringify(state.videoElement));
}

function onTimeUpdate(e: Event): void {
  const target = e.target as unknown as HTMLVideoElement;
  state.currentTime = target.currentTime;
}

function onProgressBarClick(time: number): void {
  state.videoElement.currentTime = time;
}

function onFullScreen() {
  state.fullScreen = !state.fullScreen;
}

function onVideoPlay() {
  if (!state.onPlaying) {
    return onPlay(state.videoElement)
  }
  return onPause(state.videoElement)
}

function onPlay(item: HTMLVideoElement) {
  state.onPlaying = item.play()
  state.isPlaying = true
}

function onPause(item: HTMLVideoElement) {
  if (item.played) {

    state.onPlaying?.then(() => {
      item.pause()
      state.isPlaying = false
      state.onPlaying = undefined
    })
  }
}


const videoMouseenterDebounce = debounce(() => state.isHovered = false, 3000)

function onMouseEnter() {
  if (state.isPlaying) {

    state.isHovered = true
    videoMouseenterDebounce()
  }
}
</script>

<template>
  <div
      class="video-player"
      :class="state.fullScreen && 'full-screen'"
      @mousemove="onMouseEnter"
  >
    <VVideo
        :src="src"
        :poster="poster"
        :autoplay="false"
        :loop="loop"
        :muted="muted"
        :playsinline="playsinline"
        :preload="preload"
        @on-load="onLoad"
        @on-time-update="onTimeUpdate"
    />
    <div class="video-actions">
      <div class="top-line">
        <transition name="fade" appear>
          <div class="line-wrapper" v-if="isShowControls">
            <div class="resolution">
              {{ resolution }}
            </div>
            <button
                type="button"
                class="full-screen-button"
                @click="onFullScreen"
            />
          </div>
        </transition>
      </div>
      <div class="middle-line">
        <transition name="fade" appear>
          <div
              v-show="isShowControls"
              class="video-play"
              @click="onVideoPlay"
          />
        </transition>
      </div>
      <div class="bottom-line">
        <transition name="fade" appear>
          <VideoProgressBar
              v-if="isShowControls"
              :duration="state.duration"
              :currentTime="state.currentTime"
              @on-click="onProgressBarClick"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-player,
.video-actions,
.video-play,
.middle-line,
.full-screen,
.full-screen-button:after {
  width: 100%;
  height: 100%;
}

.video-player {
  position: relative;
  max-height: 100%;
}

.video-actions,
.video-play,
.top-line,
.bottom-line,
.middle-line,
.full-screen,
.line-wrapper {
  display: flex;
}

.video-actions {
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
  flex-direction: column;
  justify-content: space-between;
}

.video-play {
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;

  &:before {
    content: '';
    width: 50px;
    height: 50px;
    display: block;
    mask: url("../../../../public/svg/play-svgrepo-com.svg") no-repeat center center /contain;
    background-color: rgba(255, 255, 255, 0.66);
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }
}

.top-line,
.bottom-line,
.middle-line {
  color: white;
  font-weight: 700;
  width: 100%;
}

.top-line,
.bottom-line {
  flex: none;
  position: relative;
  z-index: 2;
}

.top-line {
  gap: 15px;
  justify-content: space-between;
}

.middle-line {
  align-items: center;
  justify-content: center;
}

.full-screen-button {
  padding: 5px;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    mask: url("../../../../public/svg/expand1-svgrepo-com.svg") no-repeat center center /contain;
    background: #ffffff;
  }
}

.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  align-items: center;
}

.line-wrapper {
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  width: 100%;
}
</style>
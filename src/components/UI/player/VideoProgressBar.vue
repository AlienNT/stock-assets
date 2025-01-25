<script setup lang="ts">
import {formattedTime} from "@/helpers/formatHelper.ts";
import {computed, reactive, ref} from "vue";

export interface VideoProgressBarPropsInterface {
  currentTime: number;
  duration: number;
}

const props = withDefaults(defineProps<VideoProgressBarPropsInterface>(), {
  currentTime: 0,
  duration: 0,
})

const emit = defineEmits(['onClick'])

const state = reactive({
  cursorPositionTime: ''
})

const videoProgressBar = ref(null as unknown as HTMLElement)

const progress = computed(() => {
  return (100 / props.duration * props.currentTime).toFixed(2);
})

const style = computed(() => [
  `width: ${progress.value}%;`,
].join('; '))

function onMouseEnter(e: MouseEvent) {
  setCursorPositionTime(e)
}

function setCursorPositionTime(event: MouseEvent) {
  const time = calcTimePosition(event)
  state.cursorPositionTime = formattedTime(time)
}

function calcTimePosition(event: MouseEvent) {
  const targetWidth = videoProgressBar.value.offsetWidth;
  const {offsetX} = event

  const percent = +(100 / targetWidth * offsetX)
  return +(props.duration / 100 * percent).toFixed(2);
}

function onClick(e: MouseEvent) {
  const time = calcTimePosition(e)
  console.log('onClick', {time})
  emit('onClick', time)
}
</script>

<template>
  <div class="video-progress-bar">
    <div
        ref="videoProgressBar"
        class="video-progress-bar__line-track"
        :title="`${state.cursorPositionTime}`"
        @mousemove="onMouseEnter"
        @click="onClick"
    >
      <div class="line" :style="style"/>
    </div>
    <div class="video-progress-bar__time">
      <div class="current">{{ formattedTime(currentTime) }}</div>
      <div class="duration">{{ formattedTime(duration) }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-progress-bar,
.video-progress-bar__time {
  display: flex;
}

.video-progress-bar,
.video-progress-bar__line-track {
  width: 100%;
}

.video-progress-bar {
  align-items: center;
  gap: 15px;
  width: 100%;
}

.video-progress-bar__line-track {
  background: rgba(255, 255, 255, 0.49);
  height: 15px;
  cursor: pointer;
}

.line {
  transition: .25s linear;
  height: 100%;
  background: #ffffff;
}

.current {
  &:after {
    content: "/";
    padding: 2px;
  }
}

.video-progress-bar__time {
  color: #cccccc;
  font-size: 14px;
  font-weight: bold;
}
</style>
<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

export interface VideoPropsInterface {
  poster?: string,
  autoplay?: boolean,
  preload?: 'auto' | 'none' | 'metadata',
  src: string,
  muted?: boolean,
  loop?: boolean,
  controls?: boolean,
}

const props = withDefaults(defineProps<VideoPropsInterface>(), {
  autoplay: false,
  preload: 'auto',
  loop: false,
  controls: false,
  muted: false,
})

const emit = defineEmits(['onTimeUpdate', 'onLoad', 'onHTMLElement'])

const isLoaded = ref(false as boolean)
const video = ref(null as unknown as HTMLVideoElement)

function onLoad(e: Event) {
  isLoaded.value = true

  emit('onLoad', e)
}

function loadPosterListener(value: string) {
  const poster = new Image()
  poster.src = value

  poster.onload = () => {
    setTimeout(() => isLoaded.value = true, 100)
  }
}

watch(() => props.poster, (value) => {
  if (value) {
    loadPosterListener(value)
  }
}, {
  immediate: true,
})

onMounted(() => {
  emit('onHTMLElement', video.value)
})
</script>

<template>
  <video
      :class="isLoaded && 'show'"
      :poster="poster"
      :autoplay="autoplay"
      :preload="preload"
      :muted="muted"
      :loop="loop"
      :controls="controls"
      class="video"
      ref="video"
      @timeupdate="e => emit('onTimeUpdate', e)"
      @load="e => onLoad(e)"
      @canplay="onLoad"
  >
    <source :src="src"/>
  </video>
</template>

<style scoped lang="scss">
video {
  opacity: 0;
  transition: opacity .5s ease;
  width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.show {
  opacity: 1;
}
</style>
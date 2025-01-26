<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

export interface VideoPropsInterface {
  poster?: string,
  autoplay?: boolean,
  preload?: 'auto' | 'none' | 'metadata',
  src: string,
  muted?: boolean,
  loop?: boolean,
  controls?: boolean,
  playsinline?: boolean,
}

const props = withDefaults(defineProps<VideoPropsInterface>(), {
  poster: '',
  autoplay: false,
  preload: 'auto',
  loop: false,
  controls: false,
  muted: false,
  playsinline: false
})

const emit = defineEmits(['onTimeUpdate', 'onLoad', 'onHTMLElement'])

const isLoaded = ref(false as boolean)
const videoElement = ref(null as unknown as HTMLVideoElement)

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
  immediate: true
})

onMounted(() => {
  emit('onHTMLElement', videoElement.value)
})
</script>

<template>
  <video
    ref="videoElement"
    :class="isLoaded && 'show'"
    :poster="poster"
    :autoplay="autoplay"
    :preload="preload"
    muted
    :loop="loop"
    :controls="controls"
    :playsinline="playsinline"
    class="video"
    @timeupdate="e => emit('onTimeUpdate', e)"
    @load="e => onLoad(e)"
    @canplay="onLoad"
    @click.prevent
  >
    <source :src="src" />
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
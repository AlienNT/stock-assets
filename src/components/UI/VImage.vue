<script setup lang="ts">

import {computed, ref} from "vue";

export interface ImageProps {
  src: string | undefined,
  alt: string
  width?: string,
  height?: string,
  objectFit?: 'contain' | 'cover'
  background?: string | 'transparent',
  useTransition?: boolean,
  transitionDuration?: number,
  minWidth?: string,
  minHeight?: string,
  loading?: 'lazy' | 'eager'
}

const props = withDefaults(defineProps<ImageProps>(), {
  width: '100%',
  height: '100%',
  background: 'transparent',
  useTransition: true,
  objectFit: 'contain',
  transitionDuration: 500,
  minWidth: '240px',
  loading: 'lazy'
})

const emit = defineEmits(['onLoad'])

const isLoad = ref(false)

const style = computed(() => [
  props.width ? `width: ${props.width}` : '',
  props.height ? `height: ${props.height}` : '',
  props.objectFit ? `object-fit: ${props.objectFit}` : '',
  props.background ? `background: ${props.background}` : '',
  props.useTransition ? `transition: ease ${props.transitionDuration / 1000}s` : '',
  props.minWidth ? `min-width: ${props.minWidth}` : '',
  props.minHeight ? `min-height: ${props.minHeight}` : '',
].join('; '))

function onLoad() {
  isLoad.value = true
  emit('onLoad')
}
</script>

<template>
  <div class="image-wrapper">
    <img
        :class="isLoad && 'show'"
        :style="style"
        :src="props.src"
        :alt="alt"
        :loading="loading"
        @load="onLoad"
    >
  </div>
</template>

<style scoped lang="scss">
.image-wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
img {
  opacity: 0;
  transition: opacity .5s ease;
}

.show {
  opacity: 1;
}
</style>
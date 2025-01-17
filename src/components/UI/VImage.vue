<script setup lang="ts">

import {computed} from "vue";

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
}

const props = withDefaults(defineProps<ImageProps>(), {
  width: '100%',
  height: '100%',
  background: '#ccc',
  useTransition: true,
  objectFit: 'contain',
  transitionDuration: 500,
  minWidth: '240px',
})

const style = computed(() => [
  props.width ? `width: ${props.width}` : '',
  props.height ? `height: ${props.height}` : '',
  props.objectFit ? `object-fit: ${props.objectFit}` : '',
  props.background ? `background: ${props.background}` : '',
  props.useTransition ? `transition: ease ${props.transitionDuration / 1000}s` : '',
  props.minWidth ? `min-width: ${props.minWidth}` : '',
  props.minHeight ? `min-height: ${props.minHeight}` : '',
].join('; '))
</script>

<template>
  <div class="image-wrapper">
    <img
        :style="style"
        :src="props.src"
        :alt="alt"
    >
  </div>
</template>

<style scoped lang="scss">
.image-wrapper {
  display: flex;
  justify-content: center;
  flex: 1;
}
</style>
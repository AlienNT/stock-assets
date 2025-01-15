<script setup lang="ts">
import {ImageHitInterface} from "@/types/ImageTypes.ts";
import {computed, reactive} from "vue";

export interface ImageItemPropsInterface extends ImageHitInterface {
}

const props = defineProps<ImageItemPropsInterface>()

const state = reactive({
  loaded: false,
  isMobile: true
})

const src = computed(() => {
  return state.isMobile ? props.previewURL : props.webformatURL
})

function onLoad() {
  state.loaded = true;
}
</script>

<template>
  <div class="image-item">
    <img
        :class="state.loaded && 'show'"
        :src="src"
        alt="image"
        loading="lazy"
        @load="onLoad"
    >
  </div>
</template>

<style scoped lang="scss">
.image-item {
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
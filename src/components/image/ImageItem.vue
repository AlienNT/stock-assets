<script setup lang="ts">
import {ImageHitInterface} from "@/types/ImageTypes.ts";
import {computed, reactive} from "vue";
import {useUtils} from "@/composables/useUtils.ts";

export interface ImageItemPropsInterface extends ImageHitInterface {
}

const props = defineProps<ImageItemPropsInterface>()
const emit = defineEmits(['onTagClick'])

const {isMobileDevice} = useUtils()

const state = reactive({
  loaded: false,
})

const src = computed(() => {
  return isMobileDevice.value ? props.previewURL : props.webformatURL
})

const tagsArray = computed(() => {
  return props.tags ? props.tags.split(",").splice(0, 3) : []
})

function onLoad() {
  state.loaded = true;
}

function displayCounter(value?: number) {
  if (!value) return 0;

  return value <= 99999 ? value : '99999+'
}
</script>

<template>
  <div class="image-item">
    <img
        :class="state.loaded && 'show'"
        :src="src"
        :alt="tags"
        loading="lazy"
        @load="onLoad"
    >
    <div class="image-overlay">
      <div class="image-overlay__top">
        <div class="views">{{ displayCounter(views) }}</div>
        <div class="downloads">{{ displayCounter(downloads) }}</div>
        <div class="likes">{{ displayCounter(likes) }}</div>
      </div>
      <div class="image-overlay__bottom">
        <div class="tags-wrapper">
          <button
              v-for="tag in tagsArray"
              type="button"
              class="tag"
              @click.prevent.stop="emit('onTagClick', tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-item {
  width: 100%;
  position: relative;
  display: flex;

  &:hover .image-overlay {
    opacity: 1;
    visibility: visible;
  }
}

img {
  opacity: 0;
  transition: opacity .5s ease;
}

.show {
  opacity: 1;
}

.image-overlay {
  transition: opacity .5s ease, visibility .5s ease;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.image-overlay__top,
.image-overlay__bottom {
  width: 100%;
  padding: 16px;
}

.image-overlay__top {
  background: linear-gradient(180deg, rgba(25, 27, 38, .7), rgba(25, 27, 38, 0));
}

.image-overlay__bottom {
  background: linear-gradient(180deg, rgba(25, 27, 38, 0), rgba(25, 27, 38, .7));
}

.image-overlay__top {
  display: flex;
  color: #eaeaea;
  gap: 15px;
  font-family: monospace;
}

.views, .downloads, .likes {
  display: flex;
  gap: 5px;
  align-items: center;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    display: block;
    mask-size: contain;
    mask-position: center center;
    mask-repeat: no-repeat;
    background-color: #fff;
  }
}

.views {
  &:before {
    mask-image: url("../../../public/svg/look-svgrepo-com.svg");
  }
}

.downloads {
  &:before {
    mask-image: url("../../../public/svg/download-svgrepo-com.svg");
  }
}

.likes {
  &:before {
    mask-image: url("../../../public/svg/like-svgrepo-com.svg");
  }
}

.tags-wrapper {
  display: flex;
  gap: 15px;
}

.tag {
  all: unset;
  color: #efefef;
  font-family: monospace;
  display: block;

  &:hover {
    color: #ffffff;
  }

  &:first-letter {
    text-transform: uppercase;
  }
}
</style>
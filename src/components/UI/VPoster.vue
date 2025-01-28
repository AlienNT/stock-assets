<script setup lang="ts">
import {computed, defineAsyncComponent, ref, watch} from "vue";
import {useUtils} from "@/composables/useUtils.ts";

export interface PosterPropsInterface {
  src?: string,
  title?: string,
  sourceLinkUrl?: string,
  sourceLinkText?: string
  posterType: 'image' | 'video',
  posterUrl?: string
}

const props = withDefaults(defineProps<PosterPropsInterface>(), {
  src: '',
  title: '',
  sourceLinkText: 'View source',
  sourceLinkUrl: 'https://pixabay.com/',
  posterType: 'image',
  posterUrl: 'https://cdn.pixabay.com/video/2022/10/19/135658-764361528_tiny.jpg',
})

const {isMobileDevice, isFocusedScreen} = useUtils()

const htmlElement = ref(null as HTMLVideoElement | null)

const component = computed(() => {
  return props.posterType === 'image' ? 'img' : defineAsyncComponent(() => import('@/components/UI/VVideo.vue'))
})

function onHTMLElement(e: HTMLElement) {
  htmlElement.value = e as HTMLVideoElement
}

watch(() => isFocusedScreen.value, (value) => {
  if (!htmlElement.value || htmlElement.value.tagName === 'video') return

  if (!value) {
    htmlElement.value.pause()
  } else {
    htmlElement.value.play()
  }
})

</script>

<template>
  <div class="poster">
    <Component
        :is="component"
        :src="src"
        :autoplay="posterType === 'video' && !isMobileDevice && true"
        :muted="posterType === 'video' && true"
        :loop="posterType === 'video' && true"
        :poster="posterType === 'video' && posterUrl"
        :alt="posterType==='image' && 'poster image'"
        class="poster-media-container"
        @on-h-t-m-l-element="onHTMLElement"
    />
    <div class="container">
      <div class="poster-content">
        <div class="poster__title">
          {{ title }}
        </div>
        <div
            v-if="sourceLinkText.length"
            class="poster-source-link">
          <a
              :href="sourceLinkUrl"
              target="_blank"
          >
            {{ sourceLinkText }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.poster {
  height: calc(var(--vh, 100vh) * 1);
  padding-top: var(--headerH);
  width: 100%;
  display: flex;
  position: relative;

  .mobile-screen & {
    height: calc(var(--vh) * 1);
  }

  .container {
    display: flex;
  }

  &:before {
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    backdrop-filter: blur(2px);
  }
}

.poster-media-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}

.poster-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 700px;
  width: 100%;
  gap: 15px;
}

.poster__title {
  color: #ededed;
  font-weight: bold;
  font-size: 36px;
}

.poster-source-link {
  text-align: right;
  width: 100%;
  opacity: .6;

  a {
    color: #ededed;
    border-bottom: 1px solid #ededed;
  }
}
</style>
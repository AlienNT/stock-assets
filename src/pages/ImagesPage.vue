<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import imagesHelper from "@/helpers/imagesHelper.ts";
import {useImageStore} from "@/store/imageStore.ts";
import {isLastPage} from "@/helpers/requestHelper.ts";
import {useConfig} from "@/composables/useConfig.ts";
import {useSearch} from "@/composables/useSearch.ts";

import ImageList from "@/components/image/ImageList.vue";
import AssetsPageTemplate from "@/templates/AssetsPageTemplate.vue";

const {fetchImages, images, totalImages, setImages} = useImageStore()
const {appConfig} = useConfig()
const {searchQuery} = useSearch()
const {request, isLoading} = fetchImages()

const state = reactive({
  page: 1,
  isListInViewport: false,
})

onMounted(() => {
  if (!images.value.length && state.isListInViewport) {
    loadImages()
  }
})

const canLoadMore = computed(() => {
  return !isLastPage({
    perPage: appConfig.value.IMAGE_REQUEST_PER_PAGE,
    page: state.page,
    total: totalImages.value
  })
})

function loadImages() {
  if (isLoading.value) return;

  request({
    per_page: appConfig.value.IMAGE_REQUEST_PER_PAGE,
    page: state.page
  })
}

function onIntersecting(value: boolean) {
  if (value && !images.value.length) {
    loadImages()
  }
  state.isListInViewport = value
}

function onScrolled() {
  if (!canLoadMore.value || isLoading.value) return;

  setNextPageNumber()
  loadImages()
}

function setNextPageNumber(page?: number) {
  state.page = page || state.page + 1;
}

function resetPageNumber() {
  state.page = 1;
}

watch(() => searchQuery.value, (value, oldValue) => {
  if (value && value !== oldValue) {
    resetPageNumber()
    loadImages()
    setImages([])
  }
})

</script>

<template>
  <AssetsPageTemplate
      :poster-src="imagesHelper.IMAGES_PAGE_POSTER"
      title="Search royalty-free stock images"
      class="images-page"
      poster-type="image"
      is-show-poster
      @on-intersected="onIntersecting"
  >
    <template #content>
      <ImageList
          :images="images"
          :is-loading="isLoading"
          @on-scrolled="onScrolled"
      />
    </template>
  </AssetsPageTemplate>
</template>
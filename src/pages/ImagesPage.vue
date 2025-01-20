<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import imagesHelper from "@/helpers/imagesHelper.ts";
import {useImageStore} from "@/store/imageStore.ts";
import {isLastPage} from "@/helpers/requestHelper.ts";
import {useConfig} from "@/composables/useConfig.ts";
import {useSearch} from "@/composables/useSearch.ts";

import ImageList from "@/components/image/ImageList.vue";
import VPoster from "@/components/UI/VPoster.vue";

const {fetchImages, images, totalImages, setImages} = useImageStore()
const {appConfig} = useConfig()
const {searchQuery} = useSearch()
const {request, isLoading} = fetchImages()

const state = reactive({
  page: 1,
})

onMounted(() => {
  if (!images.value.length) {
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
    setImages([])
    loadImages()
  }
})

</script>

<template>
  <section class="page images-page">
    <VPoster
        title="Search royalty-free stock images"
        poster-type="image"
        :src="imagesHelper.IMAGES_PAGE_POSTER"
    />
    <div class="container">
      <div class="row">
        <ImageList
            :images="images"
            :is-loading="isLoading"
            @on-scrolled="onScrolled"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
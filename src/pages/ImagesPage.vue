<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import {useImageStore} from "@/store/imageStore.ts";
import {isLastPage} from "@/helpers/requestHelper.ts";
import {useConfig} from "@/composables/useConfig.ts";
import {useSearch} from "@/composables/useSearch.ts";
import ImageList from "@/components/image/ImageList.vue";

const {fetchImages, images, totalImages, setImages} = useImageStore()
const {appConfig} = useConfig()
const {searchQuery} = useSearch()
const {request, isLoading} = fetchImages()

const state = reactive({
  page: 1,
})

onMounted(() => {
  loadImages()
})

const canLoadMore = computed(() => {
  return !images.value.length || !isLastPage({
    perPage: appConfig.value.IMAGE_REQUEST_PER_PAGE,
    page: state.page,
    total: totalImages.value
  })
})

function loadImages() {
  if (isLoading.value || !canLoadMore.value) return;

  request({
    per_page: appConfig.value.IMAGE_REQUEST_PER_PAGE,
    page: state.page
  })
}

function onScrolled() {
  state.page++
  loadImages()
}

watch(() => searchQuery.value, (value, oldValue) => {
  if (value && value !== oldValue) {
    console.log({value, oldValue})
    state.page = 1
    setImages([])
    loadImages()
  }
})

</script>

<template>
  <section class="images-page">
    <div class="container">
      <ImageList
          :images="images"
          :is-loading="isLoading"
          @on-scrolled="onScrolled"
      />
    </div>
  </section>
</template>

<style scoped>
.images-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
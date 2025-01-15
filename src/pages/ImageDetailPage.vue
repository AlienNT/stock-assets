<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {useImageStore} from "@/store/imageStore.ts";
import {ImageHitInterface, ImageResponseInterface} from "@/types/ImageTypes.ts";

import DetailedPageTemplate from "@/templates/DetailedPageTemplate.vue";
import DetailedImage from "@/components/image/DetailedImage.vue";

const {fetchImage} = useImageStore()
const {request} = fetchImage()
const {currentRoute} = useRouter()

const state = reactive({
  imageData: {} as ImageHitInterface
})

const imageId = computed(() => {
  return currentRoute.value.params.id.toString();
})

async function getImage() {
  request({
    id: imageId.value
  }).then((response: ImageResponseInterface | void) => {
    if (!response) return;

    const {hits} = response;

    state.imageData = hits[0];
  })
}

onMounted(() => {
  getImage()
})
</script>

<template>
  <div class="image-detail-page">
    <div class="container">
      <DetailedPageTemplate>
        <template #content>
          <DetailedImage
              :id="state.imageData.id"
              :webformat-u-r-l="state.imageData.webformatURL"
              :webformat-height="state.imageData.webformatHeight"
              :webformat-width="state.imageData.webformatWidth"
          />
        </template>
        <template #info>

        </template>
      </DetailedPageTemplate>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-detail-page, .container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.detailed-page-template {
  flex: 1;
}
</style>
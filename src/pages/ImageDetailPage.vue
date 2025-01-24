<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {useImageStore} from "@/store/imageStore.ts";
import {ImageHitInterface, ImageResponseInterface} from "@/types/ImageTypes.ts";

import DetailedPageTemplate from "@/templates/DetailedPageTemplate.vue";
import DetailedImage from "@/components/image/DetailedImage.vue";
import FileDetails from "@/components/detailedPage/FileDetails.vue";
import FileDetailsDownload from "@/components/detailedPage/FileDetailsDownload.vue";
import FileDetailsDownloadField, {
  FileDetailsDownloadFieldProps
} from "@/components/detailedPage/FileDetailsDownloadField.vue";
import FileDetailsImageInfo from "@/components/detailedPage/FileDetailsImageInfo.vue";

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
  return request({
    id: imageId.value
  }).then((response: ImageResponseInterface | void) => {
    if (!response) return;

    const {hits} = response;

    state.imageData = hits[0];
  })
}

const images = computed(() => {
  return [{
    width: state.imageData.imageWidth,
    height: state.imageData.imageHeight,
    url: state.imageData.largeImageURL,
    size: state.imageData.imageSize,
  }]
})

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
              class="detailed-image"
          />
        </template>
        <template #info>
          <FileDetails
              :user="state.imageData.user"
              :user-image-u-r-l="state.imageData.userImageURL"
          >
            <template #fileDownload>
              <FileDetailsDownload
                  :items="images"
                  file-type="image"
              >
                <template
                    #default="{item, events: {onClick}}: {item: FileDetailsDownloadFieldProps, events: {onClick: any}}">
                  <FileDetailsDownloadField
                      :height="item.height"
                      :width="item.width"
                      :url="item.url"
                      :size="item.size"
                      @on-click="onClick"
                  />
                </template>
              </FileDetailsDownload>
            </template>
            <template #fileInfo>
              <FileDetailsImageInfo
                  :height="state.imageData.imageHeight"
                  :width="state.imageData.imageWidth"
                  :tags="state.imageData.tags"
                  :downloads="state.imageData.downloads"
                  :views="state.imageData.views"
                  :likes="state.imageData.likes"
                  :type="state.imageData.type"
              />
            </template>
          </FileDetails>
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
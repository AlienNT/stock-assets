<script setup lang="ts">
import {
  VideoHitInterface,
  VideoResponseInterface
} from "@/types/VideoTypes.ts";

import {useVideoStore} from "@/store/videoStore.ts";
import {computed, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import DetailedPageTemplate from "@/templates/DetailedPageTemplate.vue";
import VVideo from "@/components/UI/VVideo.vue";
import FileDetails from "@/components/detailedPage/FileDetails.vue";
import FileDetailsVideoInto from "@/components/detailedPage/FileDetailsVideoInto.vue";
import FileDetailsDownload from "@/components/detailedPage/FileDetailsDownload.vue";
import FileDetailsDownloadField, {
  FileDetailsDownloadFieldProps
} from "@/components/detailedPage/FileDetailsDownloadField.vue";

const {fetchVideo} = useVideoStore()
const {request} = fetchVideo()
const {currentRoute} = useRouter()

const state = reactive({
  videoData: {} as VideoHitInterface
})

const id = computed(() => {
  return currentRoute.value.params.id
})
const videoHits = computed(() => {
  return state.videoData.videos
})

const selectUrl = ref('' as string | undefined)

async function getVideo() {
  return request({
    id: id.value.toString(),

  }).then((response): VideoResponseInterface | void => {
    if (!response) return;

    const {hits} = response
    state.videoData = hits[0]
  })
}

onMounted(() => {
  getVideo()
})

const isSelected = (url: string | undefined) => computed(() => {
  return isSelect(url)
})

function isSelect(url: string | undefined) {
  return url === selectUrl.value
}

</script>

<template>
  <DetailedPageTemplate>
    <template #content>
      <div class="video-preview">
        <VVideo
            :key="videoHits?.medium?.url"
            :src="videoHits?.medium?.url || ''"
            :poster="videoHits?.medium?.thumbnail"
            class="video-preview"
            controls
        />
      </div>
    </template>
    <template #info>
      <div class="video-info" v-if="state.videoData.id">
        <div class="info">
          <FileDetails
              :views="state.videoData.views"
              :downloads="state.videoData.duration"
              :likes="state.videoData.likes"
              :tags="state.videoData.tags"
              :comments="state.videoData.duration"
              :user="state.videoData.user"
              :user-image-u-r-l="state.videoData.userImageURL"
          >
            <template #fileDownload>
              <FileDetailsDownload
                  file-type="video"
                  :items="state.videoData.videos"
              >
                <template
                    #default="{item,events: {onClick}}: {item: FileDetailsDownloadFieldProps, events: {onClick: any}}">
                  <FileDetailsDownloadField
                      :height="item.height"
                      :width="item.width"
                      :url="item.url"
                      :size="item?.size"
                      :selected="isSelected(item.url).value"
                      @on-click="onClick"
                  />
                </template>
              </FileDetailsDownload>
            </template>
            <template #fileInfo>
              <FileDetailsVideoInto
                  :type="state.videoData.type"
                  :tags="state.videoData.tags"
                  :duration="state.videoData.duration"
                  :likes="state.videoData.likes"
                  :views="state.videoData.views"
                  :downloads="state.videoData.downloads"
                  :height="state.videoData.videos?.large?.height"
                  :width="state.videoData.videos?.large?.width"
              />
            </template>
          </FileDetails>
        </div>
      </div>
    </template>
  </DetailedPageTemplate>
</template>

<style scoped lang="scss">
.row {
  display: flex;
}

.video-preview {
  margin: auto;
  background: #ccc;
  width: fit-content;
  max-height: 100%;
  max-width: 100%;
}

</style>
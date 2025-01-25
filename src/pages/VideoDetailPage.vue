<script setup lang="ts">
import {
  VideoHitInterface,
  VideoResponseInterface
} from "@/types/VideoTypes.ts";

import {useVideoStore} from "@/store/videoStore.ts";
import {computed, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import DetailedPageTemplate from "@/templates/DetailedPageTemplate.vue";
import FileDetails from "@/components/detailedPage/FileDetails.vue";
import FileDetailsVideoInto from "@/components/detailedPage/FileDetailsVideoInto.vue";
import FileDetailsDownload from "@/components/detailedPage/FileDetailsDownload.vue";
import FileDetailsDownloadField, {
  FileDetailsDownloadFieldProps
} from "@/components/detailedPage/FileDetailsDownloadField.vue";
import VideoPlayer from "@/components/UI/player/VideoPlayer.vue";

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

const videoData = computed(() => {
  return videoHits.value?.medium || undefined
})

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

</script>

<template>
  <DetailedPageTemplate>
    <template #content>
      <div class="video-preview">
        <VideoPlayer
            v-if="videoData"
            :src="videoData.url"
            :poster="videoData.thumbnail"
            muted
            autoplay
            loop
            controls
            preload="auto"
            class="video-preview"
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
  background: black;
  max-height: 100%;
  max-width: 100%;
}

</style>
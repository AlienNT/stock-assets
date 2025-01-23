<script setup lang="ts">
import {
  VideoHitInterface,
  VideoHitVideosInterface,
  VideoResponseFieldsInterface,
  VideoResponseInterface
} from "@/types/VideoTypes.ts";

import VideoDownloadField from "@/components/video/VideoDownloadField.vue";

import {useVideoStore} from "@/store/videoStore.ts";
import {computed, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import DetailedPageTemplate from "@/templates/DetailedPageTemplate.vue";
import VVideo from "@/components/UI/VVideo.vue";

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

async function getVideo() {
  request({
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

function getField<T>(key: string, field: keyof VideoResponseFieldsInterface): T {
  const i = key as keyof VideoHitVideosInterface

  //@ts-ignore
  return videoHits.value?.[i]?.[field] || '' as unknown as T
}

</script>

<template>
  <DetailedPageTemplate>
    <template #content>
      <VVideo
          :src="videoHits?.medium?.url || ''"
          :poster="videoHits?.medium?.thumbnail"
          controls
      />
    </template>
    <template #info>
      <div class="video-info">
        <div class="video-download"
             v-if="videoHits"
        >
          <template
              v-for="key in Object.keys(videoHits)"
              :key="key"
          >
            <div :class="`video-download__${key}`">
              <VideoDownloadField
                  :url="getField(key, 'url')"
                  :width="getField(key, 'width')"
                  :height="getField(key, 'height')"
                  :size="getField(key, 'size')"
              />
            </div>
          </template>
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
  video {
    width: 100%;
  }
}

.video-preview, .video-info {
  flex: 50%;
}

</style>
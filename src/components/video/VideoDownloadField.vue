<script setup lang="ts">
import {computed} from "vue";
import {getExtension, normalizeSize} from "@/helpers/formatHelper.ts";

interface IVideoDownloadField {
  url: string,
  width: number,
  height: number,
  size: number,
}

const props = defineProps<IVideoDownloadField>()

const formattedSize = computed(() => {
  return normalizeSize(props.size)
})

const extension = computed(() => {
  return getExtension(props.url)
})
</script>

<template>
  <div class="video-download-field">
    <div class="field hw">
      {{ width }}x{{ height }}
    </div>
    <div class="field format">
      {{ extension }}
    </div>
    <div class="field size">
      {{ formattedSize }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-download-field {
  display: flex;
  gap: 15px;
}
</style>
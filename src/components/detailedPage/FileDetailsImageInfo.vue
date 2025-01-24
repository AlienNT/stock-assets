<script setup lang="ts">

import {ImageHitInterface} from "@/types/ImageTypes.ts";

type ExcludedImageHitInterface = Omit<ImageHitInterface,
    'videos' | 'comments' | 'imageWidth' | 'imageHeight' | 'largeImageURL' | 'webformatWidth' |
    'webformatHeight' | 'webformatURL' | 'userImageURL' | 'user' | 'previewURL' | 'previewHeight' | 'previewWidth'
>

export interface FileDetailsImageInfoProps extends ExcludedImageHitInterface {
  height: number | undefined;
  width: number | undefined;
}

defineProps<FileDetailsImageInfoProps>()
</script>

<template>
  <ul class="file-details-info">
    <li class="file-details-info__field type" v-if="width && height">
      <div class="title">resolution</div>
      <div class="value">{{ width }}x{{ height }}</div>
    </li>
    <li class="file-details-info__field type">
      <div class="title">type</div>
      <div class="value">{{ type }}</div>
    </li>
    <li class="file-details-info__field views">
      <div class="title">views</div>
      <div class="value">{{ views }}</div>
    </li>
    <li class="file-details-info__field downloads">
      <div class="title">downloads</div>
      <div class="value">{{ downloads }}</div>
    </li>
    <li class="file-details-info__field likes">
      <div class="title">likes</div>
      <div class="value">{{ likes }}</div>
    </li>
    <li class="file-details-info__field tags">
      <div class="title">Tags</div>
      <div class="value"> {{ tags }}</div>
    </li>
  </ul>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
import {computed} from "vue";
import {getExtension, normalizeSize} from "@/helpers/formatHelper.ts";
import imagesHelper from "@/helpers/imagesHelper.ts";

export interface FileDetailsDownloadFieldProps {
  height: number | undefined,
  url: string | undefined,
  width: number | undefined,
  size: number | undefined,
}

const props = defineProps<FileDetailsDownloadFieldProps>()
const emit = defineEmits(['onClick'])

const size = computed(() => {
  return props.size ? normalizeSize(props.size) : null
})

const resolution = computed(() => {
  return props.width && props.height ? `${props.width}x${props.height}` : null
})

const extension = computed(() => {
  return props.url ? getExtension(props.url) : ''
})

const buttonStyles = computed(() => [
  `mask-image: url(${imagesHelper.DOWNLOAD})`
].join('; '))

function onClick() {
  emit('onClick', props.url)
}
</script>

<template>
  <div class="file-details-download-field">
    <div class="resolution">
      {{ resolution }}
    </div>
    <div class="extension">
      {{ extension }}
    </div>
    <div class="size">
      {{ size }}
    </div>
    <div class="download">
      <button
          :style="buttonStyles"
          :title="`download ${resolution}.${extension}`"
          type="button"
          @click.stop="onClick"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';
@use '../../assets/css/mixins.scss';

.file-details-download-field {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;

  > * {
    flex: 1;
  }

  .download {
    flex: none;
  }
}

$buttonColor: #3b853b;
.download {
  button {
    @include mixins.hoverBackgroundColor($color: $buttonColor);
    width: 30px;
    height: 30px;
    mask-position: center center;
    mask-size: contain;
    mask-repeat: no-repeat;
    cursor: pointer;
  }
}
</style>
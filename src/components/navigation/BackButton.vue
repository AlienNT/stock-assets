<script setup lang="ts">
import {useRouter} from "vue-router";
import {computed} from "vue";
import imagesHelper from "@/helpers/imagesHelper.ts";

export interface BackButtonPropsInterface {
  title?: string,
  showTitle?: boolean,
  showIcon?: boolean,
}

withDefaults(defineProps<BackButtonPropsInterface>(), {
  title: 'Back',
  showTitle: false,
  showIcon: true,
})

const style = computed(() => [
  imagesHelper.BACK ? `mask-image: url(${imagesHelper.BACK})` : ''
].join('; '))


const {back} = useRouter()
</script>

<template>
  <button
      class="back-button"
      type="button"
      title="Back"
      @click="back()"
  >
    <span
        v-if="showIcon"
        :style="style"
        class="icon"
    />
    <span
        v-if="showTitle"
        class="title">
      {{ title }}
    </span>
  </button>

</template>

<style scoped lang="scss">
@use 'sass:color';

$color: #cccccc;
$hoverColor: #fff;

.back-button {
  display: flex;
  cursor: pointer;
  background: transparent;
  align-items: center;
  gap: 10px;
  color: $color;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  height: 100%;

  &:hover {
    color: $hoverColor;

    .icon {
      background-color: $hoverColor;
    }
  }
}

.title,
.icon {
  display: inline-block;
  transition: color .2s ease, background-color .2s ease;
}

.icon {
  mask-position: left center;
  mask-size: contain;
  mask-repeat: no-repeat;
  height: 30px;
  width: 30px;
  background-color: $color;
}

</style>
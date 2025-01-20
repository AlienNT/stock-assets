<script setup lang="ts">
import {normalizeCounter} from "@/helpers/formatHelper.ts";
import {computed} from "vue";

interface TopOverlayFieldPropsInterface {
  type: 'likes' | 'downloads' | 'views',
  value: number | undefined,
  isShow?: boolean,
}

const props = withDefaults(defineProps<TopOverlayFieldPropsInterface>(), {
  isShow: true,
})

const displayValue = computed(() => {
  return props.value ? normalizeCounter(props.value) : 0;
})

</script>

<template>
  <div
      v-if="isShow"
      class="top-overlay-field"
      :class="type"
      :title="type"
  >
    {{ displayValue }}
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';


$imageUrls: (
    views: "../../../../svg/look-svgrepo-com.svg",
    downloads: "../../../../svg/like-svgrepo-com.svg",
    likes: "../../../../svg/download-svgrepo-com.svg",
);

.top-overlay-field {
  display: flex;
  gap: 5px;
  align-items: center;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    display: block;
    mask-size: contain;
    mask-position: center center;
    mask-repeat: no-repeat;
    background-color: #fff;
  }
}

@each $name, $imageUrl in $imageUrls {
  .#{$name} {
    &:before {
      mask-image: url($imageUrl);
    }
  }
}
</style>
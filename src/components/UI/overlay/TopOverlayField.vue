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
  >
    {{ displayValue }}
  </div>
</template>

<style scoped lang="scss">
.views, .downloads, .likes {
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

.views {
  &:before {
    mask-image: url("../../../../public/svg/look-svgrepo-com.svg");
  }
}

.likes {
  &:before {
    mask-image: url("../../../../public/svg/like-svgrepo-com.svg");
  }
}

.downloads {
  &:before {
    mask-image: url("../../../../public/svg/download-svgrepo-com.svg");
  }
}
</style>
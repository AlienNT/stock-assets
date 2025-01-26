<script setup lang="ts">
import { normalizeCounter } from '@/helpers/formatHelper.ts'
import { computed } from 'vue'
import imagesHelper from '@/helpers/imagesHelper.ts'

interface TopOverlayFieldPropsInterface {
  type: 'likes' | 'downloads' | 'views',
  value: number | undefined,
  isShow?: boolean,
}

const props = withDefaults(defineProps<TopOverlayFieldPropsInterface>(), {
  isShow: true
})

const displayValue = computed(() => {
  return props.value ? normalizeCounter(props.value) : 0
})

const bgUrl = computed(() => {
  switch (props.type) {
	case 'likes':
	  return imagesHelper.LIKE
	case 'downloads':
	  return imagesHelper.DOWNLOAD
	case 'views':
	  return imagesHelper.VIEWS
	default:
	  return ''
  }
})

const styles = computed(() => [
  bgUrl.value ? `mask-image: url(${bgUrl.value})` : ''
].join('; '))
</script>

<template>
  <div
	v-if="isShow"
	:class="type"
	:title="type"
	class="top-overlay-field"
  >
    <span
	  class="icon"
	  :style="styles"
	/>
	<span
	  class="value"
	>
      {{ displayValue }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.top-overlay-field {
  display: flex;
  gap: 5px;
  align-items: center;

  .icon {
	width: 15px;
	height: 15px;
	display: block;
	mask-size: contain;
	mask-position: center center;
	mask-repeat: no-repeat;
	background-color: #fff;
  }
}
</style>
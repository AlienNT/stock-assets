<script setup lang="ts">
import { ImageHitInterface } from '@/types/ImageTypes.ts'
import VImage from '@/components/UI/VImage.vue'

export type DetailedImageProps = ImageHitInterface

defineProps<DetailedImageProps>()
</script>

<template>
  <div class="detailed-image">
	<VImage
		:src="webformatURL"
		:background="'transparent'"
		alt="image"
	/>
  </div>
</template>

<style scoped lang="scss">
.detailed-image {
  display: flex;
  max-height: 100%;
}
</style>
<script setup lang="ts">
import { computed, reactive } from 'vue'
import imagesHelper from '@/helpers/imagesHelper.ts'
import { useUtils } from '@/composables/useUtils.ts'
import { ImageHitInterface } from '@/types/ImageTypes.ts'
import OverlayListItem from '@/components/UI/overlay/OverlayListItem.vue'
import VImage from '@/components/UI/VImage.vue'

export type ImageItemPropsInterface = ImageHitInterface

const props = defineProps<ImageItemPropsInterface>()
const emit = defineEmits(['onTagClick'])

const { isMobileDevice } = useUtils()

const state = reactive({
  loaded: false
})

const src = computed(() => {
  return isMobileDevice.value ? props.previewURL : props.webformatURL
})

function onLoad() {
  state.loaded = true
}

</script>

<template>
  <div class="image-item">
	<OverlayListItem
		:likes="likes"
		:downloads="downloads"
		:views="views"
		:tags="tags"
		class="image-overlay"
		@on-tag-click="tag => emit('onTagClick', tag)"
	>
	  <template #listItem>
		<VImage
			:src="src"
			:alt="tags || 'image'"
			:background="`url(${imagesHelper.TRANSPARENT_BG}) no-repeat center center / cover`"
			loading="lazy"
			@on-load="onLoad"
		/>
	  </template>
	</OverlayListItem>
  </div>
</template>
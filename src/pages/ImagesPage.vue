<script setup lang="ts">
import imagesHelper from '@/helpers/imagesHelper.ts'
import { useImageStore } from '@/store/imageStore.ts'
import { useConfig } from '@/composables/useConfig.ts'

import ImageList from '@/components/image/ImageList.vue'
import AssetsPageTemplate from '@/templates/AssetsPageTemplate.vue'

const { fetchImages, images, totalImages, page, setPage, resetStore } = useImageStore()
const { appConfig } = useConfig()
const { request, isLoading } = fetchImages()

</script>

<template>
  <AssetsPageTemplate
	  :poster-src="imagesHelper.IMAGES_PAGE_POSTER"
	  title="Search royalty-free stock images"
	  class="images-page"
	  poster-type="image"
	  is-show-poster
	  :is-loading
	  :items-count="images.length"
	  :page="page"
	  :per-page="appConfig.IMAGE_REQUEST_PER_PAGE"
	  :request="request"
	  :reset="resetStore"
	  :set-next-page="() => setPage(page + 1)"
	  :total="totalImages"
  >
	<template #content="{events: {onScrolled}}: {events: {onScrolled: () => void}}">
	  <ImageList
		  :images="images"
		  :is-loading="isLoading"
		  @on-scrolled="onScrolled"
	  />
	</template>
  </AssetsPageTemplate>
</template>
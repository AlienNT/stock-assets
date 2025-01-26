<script setup lang="ts" generic="Type">
import { reactive } from 'vue'
import { useDownloader } from '@/composables/useDownloader.ts'
import LoaderDotted from '@/components/UI/LoaderDotted.vue'

interface FileDetailsDownloadProps {
  items: Type[],
  fileType: 'image' | 'video',
}

defineProps<FileDetailsDownloadProps>()

const { isLoading, download } = useDownloader()

const state = reactive({
  selectedUrl: ''
})

function onClick(src: string) {
  state.selectedUrl = src

  download({ src })
}

</script>

<template>
  <div
	  class="file-download"
	  :class="isLoading && 'disabled'"
  >
	<div
		v-for="(item, key) in items"
		:key="key"
		class="file-download-option"
	>
	  <slot
		  name="default"
		  :item="item"
		  :events="{
            onClick,
          }"
	  />
	</div>
	<transition name="fade" appear>
	  <div
		  v-if="isLoading"
		  class="file-loader"
	  >
		<LoaderDotted />
	  </div>
	</transition>
  </div>
</template>

<style scoped lang="scss">
.file-download {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
}

.file-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(234, 234, 234);
  border-radius: 5px;
}
</style>
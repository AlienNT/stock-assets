<script setup lang="ts">
import {ImageHitInterface} from "@/types/ImageTypes.ts";
import {computed, reactive} from "vue";
import {useUtils} from "@/composables/useUtils.ts";
import ListItemOverlay from "@/components/UI/overlay/ListItemOverlay.vue";
import VImage from "@/components/UI/VImage.vue";

export interface ImageItemPropsInterface extends ImageHitInterface {
}

const props = defineProps<ImageItemPropsInterface>()
const emit = defineEmits(['onTagClick'])

const {isMobileDevice} = useUtils()

const state = reactive({
  loaded: false,
})

const src = computed(() => {
  return isMobileDevice.value ? props.previewURL : props.webformatURL
})

function onLoad() {
  state.loaded = true;
}


</script>

<template>
  <div class="image-item">
    <ListItemOverlay
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
            loading="lazy"
            @on-load="onLoad"
        />
      </template>
    </ListItemOverlay>
  </div>
</template>
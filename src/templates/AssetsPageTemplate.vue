<script setup lang="ts">
import VPoster from "@/components/UI/VPoster.vue";
import {computed, onMounted, ref, watch} from "vue";
import useObserver from "@/composables/useObserver.ts";

export interface AssetsPageTemplateProps {
  isShowPoster: boolean,
  posterType: 'image' | 'video'
  posterSrc: string,
  title?: string,
}

defineProps<AssetsPageTemplateProps>()

const emit = defineEmits(['onIntersected'])

const {createObserver, entryByTarget, observeTarget} = useObserver()

const templateContainer = ref(null as unknown as HTMLElement)

onMounted(() => {
  createObserver({rootMargin: '100px'})
  observeTarget(templateContainer.value)
})

const observeEntry = computed(() => {
  return entryByTarget(templateContainer.value).value
})

const isIntersecting = computed(() => {
  return observeEntry.value ? observeEntry.value.isIntersecting : false
})

watch(() => isIntersecting.value, (value) => {
  emit('onIntersected', value)
})

</script>

<template>
  <section class="page assets-page">
    <VPoster
        v-if="isShowPoster && posterSrc"
        :title="title"
        :poster-type="posterType"
        :src="posterSrc"
    />
    <div id="assets-container" class="container">
      <div id="assetsListViewport" ref="templateContainer" class="row">
        <slot name="content"/>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  min-height: var(--vh);
  padding-top: calc(var(--headerH) + 15px);
}
</style>
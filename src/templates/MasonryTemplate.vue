<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";
import {VirtualWaterfall} from "@lhlyu/vue-virtual-waterfall";
import LoaderDotted from "@/components/UI/LoaderDotted.vue";
import SearchNotFound from "@/components/UI/SearchNotFound.vue";

export interface MasonryTemplateProps {
  items: any[],
  gap?: number,
  maxColumnCount?: number,
  minColumnCount?: number,
  rowKey?: string,
  calcItemHeight?: (item: any, itemWith: number) => number,
  virtual?: boolean,
  itemMinWidth?: number,
  isLoading?: boolean
}

withDefaults(defineProps<MasonryTemplateProps>(), {
  gap: 15,
  maxColumnCount: 3,
  minColumnCount: 1,
  rowKey: "id",
  itemMinWidth: 240,
  isLoading: false,
  calcItemHeight: () => 250,
})

const emit = defineEmits(['onScrolled'])

function scrollHandler(): void {
  const {scrollY, innerHeight} = window
  const {scrollHeight} = document.documentElement
  const isScrollEnd = scrollY + 150 >= scrollHeight - innerHeight
  if (isScrollEnd) {
    emit('onScrolled')
  }
}

onMounted(() => {
  window.addEventListener('scroll', () => scrollHandler())

})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => scrollHandler())
})

</script>

<template>
  <div class="container">
    <VirtualWaterfall
        v-if="items.length"
        :items="items"
        :gap="gap"
        :maxColumnCount="maxColumnCount"
        :minColumnCount="minColumnCount"
        :rowKey="rowKey"
        :calcItemHeight="calcItemHeight"
        :virtual="virtual"
        :itemMinWidth="itemMinWidth"
    >
      <template #default="{item}:{item: any}">
        <transition appear name="fade">
          <slot
              name="content"
              :item="item"
          />
        </transition>
      </template>
    </VirtualWaterfall>
    <LoaderDotted
        v-else-if="isLoading"
        class="video-loader"
    />
    <SearchNotFound v-else/>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/css/animations";
</style>
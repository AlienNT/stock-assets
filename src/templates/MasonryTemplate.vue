<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";
import {VirtualWaterfall} from "@lhlyu/vue-virtual-waterfall";

export interface MasonryTemplateProps {
  items: any[],
  gap?: number,
  maxColumnCount?: number,
  minColumnCount?: number,
  rowKey?: string,
  calcItemHeight?: (item: any, itemWith: number) => number,
  virtual?: boolean,
  itemMinWidth?: number
}

withDefaults(defineProps<MasonryTemplateProps>(), {
  gap: 15,
  maxColumnCount: 3,
  minColumnCount: 1,
  rowKey: "id",
  itemMinWidth: 240,
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
          <slot name="content" :item="item"/>
        </transition>
      </template>
    </VirtualWaterfall>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/css/animations";
</style>
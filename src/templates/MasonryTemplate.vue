<script setup lang="ts" generic="Type">
import {computed, onBeforeUnmount, onMounted} from "vue";
import {VirtualWaterfall} from "@lhlyu/vue-virtual-waterfall";
import LoaderDotted from "@/components/UI/LoaderDotted.vue";
import SearchNotFound from "@/components/UI/SearchNotFound.vue";

interface MasonryTemplateProps {
  items: Type[],
  gap?: number,
  maxColumnCount?: number,
  minColumnCount?: number,
  rowKey?: string,
  calcItemHeight?: (item: Type, itemWith: number) => number,
  virtual?: boolean,
  itemMinWidth?: number,
  isLoading?: boolean
}

const props = withDefaults(defineProps<MasonryTemplateProps>(), {
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

const style = computed(() => [
  !props.isLoading && props.items.length ? `padding-bottom: 150px` : ''
].join('; '))

const isNotFound = computed(() => {
  return !props.isLoading && !props.items.length
})

onMounted(() => {
  window.addEventListener('scroll', () => scrollHandler())

})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => scrollHandler())
})

</script>

<template>
  <div :style="style">
    <VirtualWaterfall
        v-if="items.length"
        :items="items"
        :gap="gap"
        :max-column-count="maxColumnCount"
        :min-column-count="minColumnCount"
        :row-key="rowKey"
        :calc-item-height="calcItemHeight"
        :virtual="virtual"
        :item-min-width="itemMinWidth"
    >
      <template #default="{item}:{item: any}">
        <transition-group appear name="fade">
          <div :key="item.id" class="masonry-item">
            <slot
                name="content"
                :item="item"
            />
          </div>
        </transition-group>
      </template>
    </VirtualWaterfall>
    <SearchNotFound
        v-else-if="isNotFound"
    />
    <LoaderDotted
        v-show="isLoading"
        class="video-loader"
    />
  </div>
</template>

<style scoped lang="scss">
@use "../assets/css/animations";

.video-loader {
  padding-top: 50px;
  padding-bottom: 50px;
}

.masonry-item {
  background: #e6e6e6;
  display: flex;
  height: 100%;
  width: 100%;

  > * {
    flex: 1;
  }
}
</style>
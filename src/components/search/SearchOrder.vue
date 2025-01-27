<script setup lang="ts">
import { OrderType } from '@/types/BasicTypes.ts'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useOrderSwitcher } from '@/composables/useOrderSwitcher.ts'

export interface SearchOrderPropsInterface {
  order?: OrderType
}

const props = withDefaults(defineProps<SearchOrderPropsInterface>(), {
  order: 'popular'
})

const emit = defineEmits(['onClick'])

const pickerOptions = ref(null as unknown as HTMLElement[])

const {
  styles,
  orderOptions,
  setSelectedOptionParams,
  isSelectedOption
} = useOrderSwitcher(pickerOptions)

const selectedValue = computed(() => {
  return props.order
})

onMounted(() => {
  nextTick(() => {
	setSelectedOptionParams()
  })
})

function onSelect(value: OrderType) {
  emit('onClick', value)

  nextTick(() => {
	setSelectedOptionParams()
  })
}

</script>

<template>
  <div class="search-order">
	<div class="search-order__picker">
	  <div
		  v-for="{title, value, id} in orderOptions"
		  :key="id"
		  ref="pickerOptions"
		  :class="isSelectedOption(selectedValue, value) && 'selected'"
		  class="picker-option"
		  @click="onSelect(value)"
	  >
		{{ title }}
	  </div>
	  <div
		  class="picker-visual"
		  :style="styles"
	  />
	</div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';

$color: #5a5a5a;
$background: #e3e3e3;
$backgroundActive: #fff;
.search-order__picker,
.picker-option,
.picker-visual {
  border-radius: 50px;
}

.search-order__picker {
  background: $background;
  width: fit-content;
  display: flex;
  padding: 5px;
  position: relative;
}

.picker-option {
  padding: 5px 15px;
  cursor: pointer;
  color: $color;
  font-weight: 600;
  transition: .2s ease;
  position: relative;
  z-index: 2;

  &:hover, &.selected {
	color: color.scale($color, $lightness: -50%);
  }
}

.picker-visual {
  transition: .3s ease;
  position: absolute;
  background: $backgroundActive;
  z-index: 1;
  height: 100%;
}
</style>
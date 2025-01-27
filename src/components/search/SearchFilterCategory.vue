<script setup lang="ts">

import { CategoryType } from '@/types/BasicTypes.ts'
import { computed, reactive } from 'vue'


interface SearchFilterCategoryPropsInterface {
  category?: CategoryType,
  categories?: CategoryType[]
}

const props = withDefaults(defineProps<SearchFilterCategoryPropsInterface>(), {
  category: undefined,
  categories: () => [
	'backgrounds',
	'fashion',
	'nature',
	'science',
	'education',
	'feelings',
	'health',
	'people',
	'religion',
	'places',
	'animals',
	'industry',
	'computer',
	'food',
	'sports',
	'transportation',
	'travel',
	'buildings',
	'business',
	'music'
  ] as CategoryType[]
})

const emit = defineEmits(['onPick'])

const state = reactive({
  searchInputValue: '',
  isFocused: false
})

const displayedCategories = computed(() => {
  return props.categories.filter(category => category.indexOf(state.searchInputValue) > -1)
})

function onInput(e: Event) {
  const target = e.target as HTMLInputElement

  state.searchInputValue = target.value
}

function onFocus() {
  state.isFocused = true
}

function onBlur() {
  state.isFocused = false
}

function onPickCategory(e: CategoryType) {
  emit('onPick', e)
}
</script>

<template>
  <div class="search-filter-category">
	<label class="search-filter-category__field">
	  <input
		  type="text"
		  placeholder="Select a category"
		  :value="props.category"
		  @input="onInput"
		  @focus="onFocus"
		  @blur="onBlur"
	  >
	</label>
	<ul
		:class="state.isFocused && 'show'"
		class="search-filter-category__list"
	>
	  <li
		  v-for="(displayedCategory) in displayedCategories"
		  :key="displayedCategory"
		  class="search-filter-category__list-item"
		  @click="onPickCategory(displayedCategory)"
	  >
		{{ displayedCategory }}
	  </li>
	</ul>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';

$categoryBackgroundColor: white;
.search-filter-category {
  position: relative;
  max-width: 500px;
}

.search-filter-category__field {
  border-radius: 5px;
  border: 1px solid #ddd;

  input {
	padding: 5px 15px;
  }
}

.search-filter-category__list {
  opacity: 0;
  visibility: hidden;
  transition: 0.3s ease;
  width: 100%;
  background: #ffffff;
  position: absolute;
  max-height: 300px;
  overflow-y: scroll;
  z-index: 1;
}

.show {
  opacity: 1;
  visibility: visible;
}

.search-filter-category__list-item {
  padding: 15px;

  &:nth-child(2n) {
	background: $categoryBackgroundColor;
  }

  &:nth-child(2n - 1) {
	background: color.scale($categoryBackgroundColor, $lightness: -2%);
  }
}
</style>
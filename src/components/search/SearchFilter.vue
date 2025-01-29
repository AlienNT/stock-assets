<script setup lang="ts">
import { CategoryType } from '@/types/BasicTypes.ts'
import { reactive, watch } from 'vue'
import SearchFilterCategory from '@/components/search/SearchFilterCategory.vue'
import { SearchFilterType } from '@/composables/useSearch.ts'
import SearchFilterField from '@/components/search/fields/SearchFilterField.vue'

const props = withDefaults(defineProps<SearchFilterType>(), {
  category: undefined,
  editors_choice: false
})

const emit = defineEmits(['onSelectCategory', 'onSubmit'])

const state = reactive({
  filterFields: {
	editors_choice: false,
	category: undefined,
	min_height: undefined,
	min_width: undefined,
	safesearch: false
  } as SearchFilterType
})

function onPickCategory(category: CategoryType) {
  emit('onSelectCategory', category)
  state.filterFields.category = category
}

function onSubmit() {
  emit('onSubmit', state.filterFields)
}

watch(() => props, (val) => {
  console.log({ val })
  state.filterFields = { ...val }
}, {
  immediate: true
})

function onInput(e: Event, fieldName: keyof SearchFilterType) {
  const { value } = e.target as HTMLInputElement
  console.log({ value })
  switch (fieldName) {
	case 'min_height':
	case 'min_width':
	  return state.filterFields[fieldName] = Number(value) as number
	case 'category':
	  return state.filterFields[fieldName] = value as CategoryType
	case 'editors_choice':
	case 'safesearch':
	  console.log(Boolean(), value)
	  return state.filterFields[fieldName] = !(value === 'true') as boolean
	default:
	  return
  }
}

</script>

<template>
  <div class="search-filter">
	<SearchFilterCategory
		:category="state.filterFields.category"
		@on-pick="onPickCategory"
	/>
	<div class="search-filter__size">
	  <SearchFilterField
		  type="number"
		  title="width"
		  :value="state.filterFields.min_width"
		  @on-input="e => onInput(e, 'min_width')"
	  />
	  <SearchFilterField
		  type="number"
		  title="height"
		  :value="state.filterFields.min_height"
		  @on-input="e => onInput(e, 'min_height')"
	  />
	</div>
	<div class="search-filter__checkboxes">
	  <SearchFilterField
		  type="checkbox"
		  title="editors choice"
		  :value="state.filterFields.editors_choice"
		  @on-input="e => onInput(e, 'editors_choice')"
	  />
	  <SearchFilterField
		  type="checkbox"
		  title="safe search"
		  :value="state.filterFields.safesearch"
		  @on-input="e => onInput(e, 'safesearch')"
	  />
	</div>
	<button
		class="search-filter__button"
		type="button"
		@click="onSubmit"
	>
	  Submit
	</button>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/css/mixins.scss';

.search-filter {
  max-width: 320px;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #ffffff;
}

.search-filter__size {
  display: flex;
  gap: 10px;
}

.search-filter__button {
  padding: 5px 15px;
  background: #cccccc;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
  color: white;
  @include mixins.hoverBackgroundColor(#585a9a)
}
</style>
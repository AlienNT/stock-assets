<script setup lang="ts">
import { CategoryType } from '@/types/BasicTypes.ts'
import { reactive, watch } from 'vue'
import SearchFilterCategory from '@/components/search/SearchFilterCategory.vue'
import { SearchFilterType } from '@/composables/useSearch.ts'

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
	  return state.filterFields[fieldName] = !!value as boolean
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
	  <label class="search-filter-label size-field">
		<input
			type="number"
			:value="state.filterFields.min_width"
			@input="e => onInput(e, 'min_width')"
		>
	  </label>
	  <label class="search-filter-label size-field">
		<input
			type="number"
			:value="state.filterFields.min_height"
			@input="e => onInput(e, 'min_height')"
		>
	  </label>
	</div>
	<div class="search-filter__checkboxes">
	  <label class="search-filter-label check-field">
		<input
			type="checkbox"
			:value="state.filterFields.editors_choice"
			@input="e => onInput(e, 'editors_choice')"
		>
		<span class="title">editors choice</span>
	  </label>
	  <label class="search-filter-label check-field">
		<input
			type="checkbox"
			:value="state.filterFields.safesearch"
			@input="e => onInput(e, 'safesearch')"
		>
		<span class="title">safe search</span>
	  </label>
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
.search-filter {
  max-width: 320px;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #ffffff;
}

.search-filter__size {
  display: flex;
  gap: 15px;

  .size-field {

  }
}

.check-field {
  display: flex;
  gap: 5px;

  input {
	width: fit-content;
  }

  .title {
	padding: 5px 15px;
  }
}

.search-filter-label {
  input {
	border-radius: 10px;
	border: 1px solid #ccc;
	padding: 5px 15px;
  }
}

.search-filter__button {
  padding: 5px 15px;
  background: #cccccc;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
}
</style>
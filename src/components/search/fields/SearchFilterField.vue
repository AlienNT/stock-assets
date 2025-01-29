<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

interface SearchFilterFieldProps {
  type: 'text' | 'number' | 'checkbox',
  value?: string | number | boolean,
  title?: string
}

const props = defineProps<SearchFilterFieldProps>()

const emit = defineEmits(['onInput'])

const computedComponent = computed(() => {
  switch (props.type) {
	case 'text':
	default:
	  return defineAsyncComponent(() => import('@/components/search/fields/SearchFilterFieldText.vue'))
	case 'number':
	  return defineAsyncComponent(() => import('@/components/search/fields/SearchFilterFieldNumber.vue'))
	case 'checkbox':
	  return defineAsyncComponent(() => import('@/components/search/fields/SearchFilterFieldCheckbox.vue'))
  }
})

</script>

<template>
  <div class="search-field">
	<Component
		:is="computedComponent"
		:value="value"
		:title="title"
		@on-input="e => emit('onInput', e)"
	/>
  </div>
</template>

<style lang="scss">
.search-filter-field__input {
  border-radius: 10px;
  border: 2px solid rgba(115, 115, 191, 0.5);
  transition: border-color .2s ease;
  padding: 5px 15px;

  &:focus {
	border: 2px solid rgba(115, 115, 191, 0.8);
	&::placeholder {
	  color: transparent;
	}
  }

  &::placeholder {
	transition: color .2s ease;
  }
}
</style>
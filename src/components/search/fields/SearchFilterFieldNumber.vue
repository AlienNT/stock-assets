<script setup lang="ts">

withDefaults(defineProps<{
  title?: string,
  value?: number | undefined,
  min?: number,
  max?: number,
}>(), {
  min: 0,
  value: undefined,
  max: undefined,
  title: ''
})

const emit = defineEmits(['onInput'])
</script>

<template>
  <label class="search-filter-field search-filter-filed--number">
	<input
		class="search-filter-field__input"
		type="number"
		pattern="[0-9]*"
		:min="min"
		:max="max"
		:value="value"
		:placeholder="title"
		@input="e => emit('onInput', e)"
	/>
  </label>
</template>

<style scoped lang="scss">
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
<script setup lang="ts">
defineProps<{
 title?: string,
 value?: string
}>()

const emit = defineEmits(['onInput'])
</script>

<template>
  <label class="search-filter-field search-filter-field--text">
	<input
		class="search-filter-field__input"
		type="text"
		:value="value"
		:placeholder="title"
		@input="e => emit('onInput', e)"
	>
  </label>
</template>
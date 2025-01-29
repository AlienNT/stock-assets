<script setup lang="ts">
defineProps<{
  title?: string
  value?: boolean
}>()
const emit = defineEmits(['onInput'])

</script>

<template>
  <label class="checkbox">
	<span
		class="checkbox"
		:class="value && 'checked'"
	/>
	<input
		type="checkbox"
		:checked="value"
		:value="value"
		@input="e => emit('onInput', e)"
	/>
	<span class="title">{{ title }}</span>
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  gap: 5px;
  align-items: center;

  input {
	display: none;
	flex: none;
	width: fit-content;
  }

  .checkbox {
	width: 16px;
	height: 16px;
	border-radius: 5px;
	border: 2px solid #7373bf;
	transition: .2s ease;
  }
}

.checked {
  background: #7373bf;
  display: flex;
  align-items: center;
  justify-content: center;


  &:after {
	width: 80%;
	height: 80%;
	content: '✔';
	transition: .2s ease;
	font-size: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
  }
}

.title {
  font-size: 14px;
}
</style>
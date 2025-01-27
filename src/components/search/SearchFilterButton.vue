<script setup lang="ts">
import { reactive } from 'vue'
import { SearchFilterType } from '@/composables/useSearch.ts'

const emit = defineEmits(['onClick', 'onSubmit'])

const state = reactive({
  isShow: false
})

function onSubmit(e: SearchFilterType){
  emit('onSubmit', e)
  state.isShow = false
}
</script>

<template>
  <div class="search-filter-button" :class="state.isShow && 'open'">
	<button
		type="button"
		class="button"
		@click="state.isShow = !state.isShow"
	>
	  <span class="title">
		filter
	  </span>
	</button>
	<transition name="fade">
	  <div
		  v-if="state.isShow"
		  class="search-filter-popup"
	  >
		<slot
			name="popup"
			:events="{onSubmit}"
		/>
	  </div>
	</transition>
  </div>

</template>

<style scoped lang="scss">
.search-filter-button {
  position: relative;
  display: block;
}

.button {
  height: 100%;
  padding: 5px 15px;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid rgba(34, 34, 34, 0.32);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;

  &:after {
	content: "▼";
	display: block;
	transition: .3s ease;
	color: rgba(34, 34, 34, 0.32);
  }

  .open & {
	&:after {
	  transform: rotateX(-180deg);
	}
  }
}

.title {
  color: #222222;
  &:first-letter {
	text-transform: uppercase;
  }
}

.search-filter-popup {
  top: 100%;
  min-width: 280px;
  position: absolute;
  z-index: 3;
  transform: translateY(10px);
}
</style>
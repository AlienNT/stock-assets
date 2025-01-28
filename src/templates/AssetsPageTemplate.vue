<script setup lang="ts" generic="T">
import VPoster from '@/components/UI/VPoster.vue'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import useObserver from '@/composables/useObserver.ts'
import { SearchFilterType, useSearch } from '@/composables/useSearch.ts'
import { ImageRequestInterface } from '@/types/ImageTypes.ts'
import { VideoRequestInterface } from '@/types/VideoTypes.ts'
import { isLastPage } from '@/helpers/requestHelper.ts'
import SearchOrder from '@/components/search/SearchOrder.vue'
import SearchFilter from '@/components/search/SearchFilter.vue'
import SearchFilterButton from '@/components/search/SearchFilterButton.vue'

interface AssetsPageTemplateProps {
  isShowPoster: boolean,
  posterType: 'image' | 'video'
  posterSrc: string,
  title?: string,
  perPage: number,
  page: number,
  itemsCount: number,
  total: number,
  isLoading: boolean,
  reset: () => void,
  request: ({ ...args }: ImageRequestInterface | VideoRequestInterface) => Promise<T>,
  setNextPage: (page: number) => void,
}

const { createObserver, entryByTarget, observeTarget } = useObserver()
const { searchQuery, searchOrder, setSearchOrder, filterFields, setFilterFields } = useSearch()

const props = defineProps<AssetsPageTemplateProps>()

const templateContainer = ref(null as unknown as HTMLElement)
const listViewport = ref(null as unknown as HTMLElement)

const state = reactive({
  isListInViewport: false
})

const observeEntry = computed(() => {
  return entryByTarget(listViewport.value).value
})

const isIntersecting = computed(() => {
  return observeEntry.value ? observeEntry.value.isIntersecting : false
})

const canLoadMore = computed(() => {
  return !props.itemsCount || !isLastPage({
	perPage: props.perPage,
	page: props.page,
	total: props.total
  })
})

const searchParams = computed(() => {
  return `${searchQuery.value}${searchOrder.value}` + JSON.stringify(filterFields.value)
})

onMounted(() => {
  if (!props.itemsCount && state.isListInViewport) {
	load().then(() => scrollToViewport())
  }

  if (props.itemsCount) {
	scrollToViewport()
  }

  nextTick(() => {
	createObserver({
	  rootMargin: '0px',

	})
	observeTarget(listViewport.value)
  })
})

watch(() => isIntersecting.value, (value) => {
  onIntersected(value)
})

watch(() => searchParams.value, async (value, oldValue) => {
  if (value && value !== oldValue && !props.isLoading) {

	props.reset()
	await load()
	scrollToViewport()
  }
})

function load() {
  return props.request({
	page: props.page,
	per_page: props.perPage
  })
}

function onIntersected(value: boolean) {
  if (value && !props.itemsCount) {
	load()
  }
  state.isListInViewport = value
}

function onScrolled() {
  if (!canLoadMore.value || props.isLoading) return

  props.setNextPage(props.page + 1)
  nextTick(() => load())
}

function scrollToViewport() {
  templateContainer.value?.scrollIntoView({
	behavior: 'smooth'
  })
}

</script>

<template>
  <section class="page assets-page">
	<VPoster
		v-if="isShowPoster && posterSrc"
		:title="title"
		:poster-type="posterType"
		:src="posterSrc"
	/>
	<div
		id="assetsListViewport"
		class="container"
		ref="templateContainer"
	>
	  <div class="row search-row">
		<SearchFilterButton
			class="col filter-col"
			@on-submit="setFilterFields"
		>
		  <template #popup="{events: {onSubmit}} : {events: {onSubmit: (e:SearchFilterType) => void}}">
			<SearchFilter
				:category="filterFields.category"
				:editors_choice="filterFields.editors_choice"
				:min_height="filterFields.min_height"
				:min_width="filterFields.min_width"
				:safesearch="filterFields.safesearch"
				@on-submit="onSubmit"
			/>
		  </template>
		</SearchFilterButton>
		<SearchOrder
			class="col search-order"
			:order="searchOrder"
			@on-click="setSearchOrder"
		/>
	  </div>
	  <div class="row" ref="listViewport">
		<slot
			name="content"
			:events="{onScrolled}"
		/>
	  </div>
	</div>
  </section>
</template>

<style scoped lang="scss">
.container {
  min-height: var(--vh);
  padding-top: calc(var(--headerH) + 15px);
}

.row {
  flex-direction: column;
}

.filter-col {
  //height: 100%;
  display: flex;
  flex: 1;
}
.search-row {
  flex-direction: row;
  justify-content: space-between;
}
</style>
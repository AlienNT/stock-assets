<script setup lang="ts">
import { Ref, computed, onMounted, onUpdated, ref, watch } from 'vue'
import { setCSSProperty } from '@/helpers/formatHelper.ts'

import PagesNavigation from '@/components/navigation/PagesNavigation.vue'
import VLogo from '@/components/UI/VLogo.vue'
import SearchForm from '@/components/search/SearchForm.vue'
import BurgerButton from '@/components/UI/BurgerButton.vue'
import { useUtils } from '@/composables/useUtils.ts'
import { useRouter } from 'vue-router'

const header: Ref<HTMLElement> = ref(null) as unknown as Ref<HTMLElement>

const { isMobileScreen, isShowNavigation, setIsShowNavigation } = useUtils()
const router = useRouter()

onMounted(() => {
  setCSSProperty('--headerH', `${header.value?.offsetHeight}px`)
  addEventListener('scroll', setHeaderOpacity)
})

onUpdated(() => {
  setCSSProperty('--headerH', `${header.value?.offsetHeight}px`)
})

const routeName = computed(() => {
  return router.currentRoute.value.name
})

const isListPage = computed(() => {
  return routeName.value === 'Images' || routeName.value === 'Videos'
})

const isNotTransparentBG = computed(() => {
  return isMobileScreen.value || !isListPage.value
})

const isShowSearch = computed(() => {
  return isListPage.value
})

const isOpenNav = computed(() => {
  return isShowNavigation.value || !isMobileScreen.value
})

const isDisabledScrollable = computed(() => {
  return isMobileScreen.value && isOpenNav.value
})

function setHeaderOpacity() {
  const opacity = calcOpacity(window.scrollY, window.innerHeight)
  setCSSProperty('--headerOpacity', `${opacity}`)
}

function calcOpacity(scrollHeight: number, windowHeight: number) {
  if (isNotTransparentBG.value && routeName.value) {
	return 1
  }
  const coefficient = +(scrollHeight * 4 / windowHeight).toFixed(2)
  return coefficient <= 1 ? coefficient : 1
}

watch(() => routeName.value, () => {
  setHeaderOpacity()
}, {
  immediate: true,
})

watch(() => isDisabledScrollable.value, (value) => {
  if (value) {
	document.body.classList.add('scroll-disabled')
  } else {
	document.body.classList.remove('scroll-disabled')
  }
}, {
  immediate: true
})
</script>

<template>
  <header
	  ref="header"
	  :class="isMobileScreen && isOpenNav && 'mobile-header'"
	  class="header"
  >
	<div class="container">
	  <div class="row header-row">
		<VLogo class="col logo-col" />
		<SearchForm
			v-if="isShowSearch"
			class="col search-col"
		/>
		<transition name="fade" appear>
		  <PagesNavigation
			  v-if="isOpenNav"
			  class="col navigation-col"
			  :class="isMobileScreen && 'mobile-navigation'"
			  :is-mobile="isMobileScreen"
			  @on-click="setIsShowNavigation(false)"
		  />
		</transition>
		<div
			v-if="isMobileScreen"
			class="col burger-col"
		>
		  <BurgerButton
			  :is-active="isShowNavigation"
			  @on-click="setIsShowNavigation(!isShowNavigation)"
		  />
		</div>
	  </div>
	</div>
  </header>
</template>

<style scoped lang="scss">
$opacity: var(--headerOpacity, 0);

.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, $opacity);
  padding: 10px 0;
  z-index: 99;
}

.header-row {
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
}

.search-col {
  flex: 1;
  max-width: 600px;
}

.burger-col {
  display: flex;
  align-items: center;
}

.navigation-col {
  flex: none;
  transition: .2s ease;
}

.mobile-navigation {
  order: 6;
  width: 100%;
  position: fixed;
  top: var(--headerH);
  left: 0;
  z-index: 3;
  height: calc(var(--openNavHeight) - var(--headerH));
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
}
</style>
<script setup lang="ts">
import {onMounted, reactive, Ref, ref} from "vue";
import {setCSSProperty} from "@/helpers/formatHelper.ts";

import PagesNavigation from "@/components/navigation/PagesNavigation.vue";
import VLogo from "@/components/UI/VLogo.vue";
import SearchForm from "@/components/search/SearchForm.vue";
import BurgerButton from "@/components/UI/BurgerButton.vue";
import {useUtils} from "@/composables/useUtils.ts";

const header: Ref<HTMLElement> = ref(null) as unknown as Ref<HTMLElement>
const state = reactive({
  bgOpacity: 0,
})

const {isMobileScreen, isShowNavigation, setIsShowNavigation} = useUtils()

onMounted(() => {
  setCSSProperty('--headerH', `${header.value?.offsetHeight}px`)
  addEventListener('scroll', setHeaderOpacity)
})

function setHeaderOpacity() {
  const opacity = calcOpacity(window.scrollY, window.innerHeight)
  if (opacity === state.bgOpacity) return

  setCSSProperty('--headerOpacity', `${opacity}`)
}

function calcOpacity(scrollHeight: number, windowHeight: number) {
  const coefficient = +(scrollHeight * 2 / windowHeight).toFixed(2)
  return coefficient <= 1 ? coefficient : 1
}
</script>

<template>
  <header class="header" ref="header">
    <div class="container">
      <div class="row header-row">
        <div class="col logo-col">
          <VLogo/>
        </div>
        <div class="col search-col">
          <SearchForm/>
        </div>
        <PagesNavigation
            v-if="isShowNavigation || !isMobileScreen"
            class="col navigation-col"
            :class="isMobileScreen && 'mobile-navigation'"
            :is-mobile="isMobileScreen"
        />
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
$opacity: var(--headerOpacity);

.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, $opacity);
  padding: 10px 15px;
  z-index: 2;
}

.header-row {
  justify-content: space-between;
  //flex-wrap: nowrap;
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
}
.mobile-navigation {
  order: 6;
  flex: 100%;
  height: calc(var(--vh) - var(--headerH));
}
</style>
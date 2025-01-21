<script setup lang="ts">
import {onMounted, reactive, Ref, ref} from "vue";
import {setCSSProperty} from "@/helpers/formatHelper.ts";

import PagesNavigation from "@/components/navigation/PagesNavigation.vue";
import VLogo from "@/components/UI/VLogo.vue";
import SearchForm from "@/components/search/SearchForm.vue";

const header: Ref<HTMLElement> = ref(null) as unknown as Ref<HTMLElement>
const state = reactive({
  bgOpacity: 0,
})

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
      <div class="row">
        <div class="col logo-col">
          <VLogo/>
        </div>
        <div class="col search-col">
          <SearchForm/>
        </div>
        <div class="col navigation-col">
          <PagesNavigation/>
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

  .row {
    justify-content: space-between;
  }
}

.search-col {
  flex: 1;
}
</style>
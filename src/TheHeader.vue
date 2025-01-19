<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import {setCSSProperty} from "@/helpers/formatHelper.ts";

import PagesNavigation from "@/components/navigation/PagesNavigation.vue";
import VLogo from "@/components/UI/VLogo.vue";
import SearchForm from "@/components/search/SearchForm.vue";

const header: Ref<HTMLElement> = ref(null) as unknown as Ref<HTMLElement>

onMounted(() => {
  setCSSProperty('--headerH', `${header.value.offsetHeight}px`)
})
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

<style scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  background: #000;
  padding: 15px;
  z-index: 2;

  .row {
    justify-content: space-between;
  }
}

.search-col {
  flex: 1;
}
</style>
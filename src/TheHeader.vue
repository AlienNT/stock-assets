<script setup lang="ts">
import {onMounted, reactive, Ref, ref} from "vue";
import {setCSSProperty} from "@/helpers/formatHelper.ts";
import {useUtils} from "@/composables/useUtils.ts";
import PagesNavigation from "@/components/navigation/PagesNavigation.vue";
import SearchField from "@/components/UI/SearchField.vue";


const header: Ref<HTMLElement> = ref(null) as unknown as Ref<HTMLElement>

const state = reactive({
  searchValue: "",
})

const {setSearchQuery} = useUtils()

function onSubmit() {
  console.log('onSubmit', state.searchValue)
  setSearchQuery(state.searchValue)
}

onMounted(() => {
  setCSSProperty('--headerH', `${header.value.offsetHeight}px`)
})
</script>

<template>
<header class="header" ref="header">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="logo"/>
      </div>
      <div class="col">
        <PagesNavigation/>
      </div>
      <div class="col">
        <form class="search-form" @submit.prevent="onSubmit">
          <SearchField
              :value="state.searchValue"
              @on-change="e => state.searchValue = e"
          />
        </form>
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
  z-index: 1;
}
</style>
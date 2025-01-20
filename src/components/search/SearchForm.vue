<script setup lang="ts">

import SearchField from "@/components/search/SearchField.vue";
import {computed, reactive} from "vue";
import {useSearch} from "@/composables/useSearch.ts";
import {useRouter} from "vue-router";

const {setSearchQuery, searchQuery} = useSearch()
const {currentRoute}=useRouter()

const state = reactive({
  searchValue: "",
})

const enabledRoutes = ["/images", "/videos", '/']


const isDisabled = computed(() => {
  return !enabledRoutes.find(route => route === currentRoute.value.fullPath)
})

function onSubmit() {
  setSearchQuery(state.searchValue)
}
</script>

<template>
  <form class="search-form" @submit.prevent="onSubmit">
    <SearchField
        :value="searchQuery"
        :disabled="isDisabled"
        @on-change="e => state.searchValue = e"
    />
    <div class="search-button-wrapper">
      <button class="search-button" type="submit"/>
    </div>
  </form>
</template>

<style scoped lang="scss">
$fieldBGColor: #d6d6d6;
$searchButtonBG: "../../../public/svg/search-svgrepo-com.svg";
.search-form {
  display: flex;
  flex: 1;
  height: 100%;
  color: white;
  border-radius: 50px;
  background: $fieldBGColor;
  overflow: hidden;
  padding: 5px;
  align-items: center;
}

.search-button-wrapper {
  display: flex;
  border-radius: 50px;
  overflow: hidden;
  cursor: pointer;
  background: #585a9a;
  padding: 5px;
  transition:  0.2s ease;
}
.search-button {
  flex: 1;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
  mask-image: url($searchButtonBG);
  mask-repeat: no-repeat;
  mask-size: 60%;
  mask-position: center center;
  background-color: #ffffff;
}
</style>
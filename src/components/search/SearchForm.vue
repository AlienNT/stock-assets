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
  </form>
</template>

<style scoped lang="scss">
.search-form {
  display: flex;
  flex: 1;
  height: 100%;
  color: white;
}
</style>
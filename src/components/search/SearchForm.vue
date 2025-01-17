<script setup lang="ts">

import SearchField from "@/components/search/SearchField.vue";
import {reactive} from "vue";

const emit = defineEmits(['onSearch']);

const state = reactive({
  searchValue: "",
})

function onSubmit() {
  emit('onSearch', state.searchValue)
}
</script>

<template>
  <form class="search-form" @submit.prevent="onSubmit">
    <SearchField
        :value="state.searchValue"
        @on-change="e => state.searchValue = e"
    />
  </form>
</template>

<style scoped lang="scss">
.search-form {
  display: flex;
  flex: 1;
  height: 100%;
}
</style>
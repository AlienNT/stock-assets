<script setup lang="ts">
export interface SearchNotFoundProps {
  title?: string
}

withDefaults(defineProps<SearchNotFoundProps>(), {
  title: 'not found'
})
</script>

<template>
<div class="search-not-found">
  {{title}}
</div>
</template>

<style scoped lang="scss">
.search-not-found {
  text-transform: uppercase;
  font-size: 24px;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 25px;
}
</style>
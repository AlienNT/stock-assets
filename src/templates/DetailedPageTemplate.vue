<script setup lang="ts">

</script>

<template>
  <div class="detailed-page-template">
    <div class="detailed-page-content">
      <slot name="content"/>
    </div>
    <div class="detailed-page-info">
      <slot name="info"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detailed-page-template {
  display: flex;
  flex-wrap: wrap;
}
.detailed-page-content {
  flex: 1 1 65%;
  display: flex;
  flex-direction: column;
}
.detailed-page-info {
  flex: 1 1 35%;
}
</style>
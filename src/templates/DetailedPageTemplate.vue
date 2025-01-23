<script setup lang="ts">

</script>

<template>
  <div class="detailed-page-template">
    <div class="container">
      <div class="row">
        <div class="col detailed-page-content">
          <slot name="content"/>
        </div>
        <div class="col detailed-page-info">
          <slot name="info"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detailed-page-template {
  display: flex;
  flex-wrap: wrap;
  padding-top: calc(var(--headerH) + 15px);
}
.detailed-page-content {
  flex: 1 1 65%;
  display: flex;
  flex-direction: column;
  max-height: var(--vh);
}
.detailed-page-info {
  flex: 1 1 35%;
}
</style>
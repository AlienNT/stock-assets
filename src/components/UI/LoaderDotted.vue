<script setup lang="ts">

</script>

<template>
  <div class="loader-container">
    <div class="loader-wrapper">
      <span class="loader" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px;
  overflow: hidden;
}
.loader-wrapper {
  height: 50px;
  width: 50px;

  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;

}

.loader {
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  padding-left: 100%;
  padding-top: 100%;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #585a9a;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
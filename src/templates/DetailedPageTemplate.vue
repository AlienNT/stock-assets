<template>
  <div class="detailed-page-template">
    <div class="container">
      <div class="row">
        <div class="col detailed-page-content">
          <slot name="content" />
        </div>
        <div class="col detailed-page-info">
          <slot name="info" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$headerHeight: var(--headerH);
$sectionHeight: calc(var(--vh) - #{$headerHeight});
.container {
  max-width: 1200px;
}
.detailed-page-template {
  display: flex;
  flex: 1;
  padding-top: 50px;
  padding-bottom: 50px;
  margin-top: $headerHeight;
  height: 100%;

  .row {
    height: 100%;
  }
  @media all and (max-width: 768px) {
    padding-top: 0;
  }
}

.detailed-page-content {
  flex: 1 1 65%;
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.detailed-page-info {
  flex: 1 1 35%;
  min-width: 320px;
}

.detailed-page-content,
.detailed-page-info {
  padding: 15px;
}
</style>
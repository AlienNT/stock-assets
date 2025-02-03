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
$sectionPadding: 50px;
$sectionHeight: calc(var(--vh) - #{$headerHeight});
$contentHeight: calc($sectionHeight - ($sectionPadding * 2));

.container {
  max-width: 1200px;
}
.detailed-page-template {
  display: flex;
  flex: 1;
  padding-top: $sectionPadding;
  padding-bottom: $sectionPadding;
  margin-top: $headerHeight;
  height: 100%;

  .row {
    height: 100%;
  }
  @media all and (max-width: 768px) {
    padding-top: 0;
	max-height: unset;
  }
}

.detailed-page-content {
  flex: 1 1 65%;
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: $contentHeight;
}

.detailed-page-info {
  flex: 1 1 35%;
  min-width: 320px;
}

.detailed-page-content,
.detailed-page-info {
  padding: 15px;
}
.content-wrapper {
  position: absolute;
  width: 100%;
}
</style>
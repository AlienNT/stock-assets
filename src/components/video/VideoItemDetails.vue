<script setup lang="ts">
export interface VideoItemDetailsProps {
  displayedQuality: string | number,
  displayedDuration: string | number,
}

defineProps<VideoItemDetailsProps>()

</script>

<template>
  <div class="video-details">
    <div class="video-quality">
      {{ displayedQuality }}
    </div>
    <div class="video-duration">
      {{ displayedDuration }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-details {
  display: flex;
  gap: 5px;
  color: #cccccc;
}

.video-quality {
  color: white;
  font-weight: bold;
}
</style>
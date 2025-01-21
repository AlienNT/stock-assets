<script setup lang="ts">
import OverlayTag from "@/components/UI/overlay/OverlayTag.vue";

export interface OverlayTagListProps {
  tags: string[];
}

defineProps<OverlayTagListProps>()

const emit = defineEmits(['onTagClick'])
</script>

<template>
  <div class="overlay-tags-list">
    <OverlayTag
        v-for="(tag, index) in tags"
        :key="index"
        :tag="tag"
        @on-tag-click="e => emit('onTagClick', e)"
    />
  </div>
</template>

<style scoped lang="scss">
.overlay-tags-list {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
</style>
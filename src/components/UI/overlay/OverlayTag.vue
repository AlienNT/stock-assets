<script setup lang="ts">
export interface OverlayTagProps {
  tag: string
}

defineProps<OverlayTagProps>()

const emit = defineEmits(['onTagClick'])
</script>

<template>
  <button
      type="button"
      class="tag"
      :title="'search ' + tag"
      @click.prevent.stop="emit('onTagClick', tag)"
  >
    {{ tag }}
  </button>
</template>

<style scoped lang="scss">
.tag {
  all: unset;
  color: #efefef;
  display: block;
  font-size: 14px;

  &:hover {
    color: #ffffff;
  }

  &:first-letter {
    text-transform: uppercase;
  }
}
</style>
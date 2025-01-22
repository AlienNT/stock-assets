<script setup lang="ts">
import {computed} from "vue";

export interface BurgerButtonProps {
  width?: string,
  height?: string,
  isActive?: boolean,
  title?: string
}

const props = withDefaults(defineProps<BurgerButtonProps>(), {
  width: '40px',
  height: '40px',
  isActive: false,
  title: 'toggle navigation'
})

const emit = defineEmits(['onClick'])

const styles = computed(() => [
  props.width ? `width: ${props.width}` : '',
  props.height ? `height: ${props.height}` : '',

].join('; '))

</script>

<template>
  <div
      class="burger-button"
      :title="title"
      :style="styles"
      :class="isActive && 'active'"
      @click="emit('onClick')"
  >
    <div class="line-wrapper">
      <div v-for="lineKey in 3" class="burger-button__line" :key="lineKey"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.burger-button {
  display: flex;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.line-wrapper {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  position: relative;
  display: flex;
  flex: 1;
}

.burger-button__line {
  width: 100%;
  height: 3px;
  background: #ffffff;
  border-radius: 5px;
  transition: .2s ease;
}

.active {
  .burger-button__line {
    position: absolute;
    &:nth-of-type(1) {
      transform: rotate(45deg);
    }

    &:nth-of-type(2) {
      opacity: 0;
    }

    &:nth-of-type(3) {
      transform: rotate(-45deg);
    }
  }
}
</style>
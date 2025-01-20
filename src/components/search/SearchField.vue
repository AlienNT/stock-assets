<script setup lang="ts">
export interface SearchFieldProps {
  value: string,
  placeholder?: string,
  disabled?: boolean,
  name?: string,
  type?: 'text' | 'search',
}

withDefaults(defineProps<SearchFieldProps>(), {
  type: 'text',
  placeholder: 'Search',
  name: 'SearchField',
  disabled: false,
})

const emit = defineEmits(['onChange'])

function onChange(e: Event) {
  const {value} = e.target as HTMLInputElement;
  emit('onChange', value)
}

</script>

<template>
  <div class="search">
    <label
        class="search-label"
        :class="disabled && 'disabled'"
    >
      <input
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :value="value"
          :disabled="disabled"
          class="search-field"
          @change="onChange"
      >
    </label>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';

.search, .search-label, .search-field  {
  height: 100%;
  flex: 1;
  display: flex;
}
.search {
  input {
    font-size: 16px;
    width: 100%;
    padding: 8px 20px;
    transition: background 0.2s ease, color 0.2s ease;
    background: transparent;

    &[disabled] {
      user-select: none;
      pointer-events: none;
    }

    &::placeholder {
      transition: color 0.2s ease;
    }

    &:focus {
      &::placeholder {
        color: transparent;
      }
    }
  }
}
</style>
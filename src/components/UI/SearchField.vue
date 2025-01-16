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
  console.log('value', value)
  emit('onChange', value)
}
</script>

<template>
  <div class="search">
    <label class="search-label">
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

$fieldBGColor: #d6d6d6;
.search {
  input {
    width: 100%;
    padding: 5px 15px;
    border-radius: 50px;
    background: $fieldBGColor;
    transition: background 0.2s ease, color 0.2s ease;

    &::placeholder {
      transition: color 0.2s ease;
    }

    &:focus {
      &::placeholder {
        color: transparent;
      }
    }

    &:hover {
      background: color.scale($fieldBGColor, $lightness: 50%);
    }
  }
}
</style>
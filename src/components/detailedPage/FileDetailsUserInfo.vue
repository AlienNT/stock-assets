<script setup lang="ts">
import VImage from "@/components/UI/VImage.vue";

export interface FileDetailsUserInfoProps {
  imageUrl: string,
  userName: string,
}

defineProps<FileDetailsUserInfoProps>()
</script>

<template>
  <div class="user">
    <div class="user__image">
      <VImage
          :src="imageUrl"
          :alt="userName + ' avatar'"
      />
    </div>
    <div class="user__name">
      {{ userName }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.user {
  display: flex;
  gap: 15px;
  align-items: center;
}

.user__image {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
}

.user__name {
  font-weight: 700;
  color: #222222;
}
</style>
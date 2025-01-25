<script setup lang="ts">
import {BaseHitInterface} from "@/types/BasicTypes.ts";
import FileDetailsUserInfo from "@/components/detailedPage/FileDetailsUserInfo.vue";
import {useSlots} from "vue";

export interface FileDetailsProps extends Pick<BaseHitInterface, 'user' | 'userImageURL'> {
  showDownloads?: boolean,
  showFileInfo?: boolean,
  showUserInfo?: boolean,
}

withDefaults(defineProps<FileDetailsProps>(), {
  showDownloads: true,
  showFileInfo: true,
  showUserInfo: true,
})

const slots = useSlots()

</script>

<template>
  <div class="file-details">
    <div
        v-if="slots['fileDownload'] && showDownloads"
        class="file-downloads"
    >
      <slot name="fileDownload"/>
    </div>
    <div
        v-if="slots['fileInfo'] && showFileInfo"
        class="file-info"
    >
      <slot name="fileInfo"/>
    </div>
    <div
        v-if="showUserInfo && user && userImageURL"
        class="file-user-info"
    >
      <FileDetailsUserInfo
          :image-url="userImageURL"
          :user-name="user"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-details {
  box-shadow: 0 0 8px 0 rgba(152, 152, 152, 0.58);
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  > * {
    border-bottom: 1px solid rgba(152, 152, 152, 0.5);
    padding-bottom: 15px;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
}
</style>
<script setup lang="ts">
import {computed} from "vue";
import TopOverlayField from "@/components/UI/overlay/TopOverlayField.vue";

export interface ListItemOverlayProps {
  views?: number,
  downloads?: number,
  likes?: number,
  tags?: string,
  showTagsCount?: number,
  isShowLikes?: boolean,
  isShowDownloads?: boolean,
  isShowViews?: boolean,
}

const props = withDefaults(defineProps<ListItemOverlayProps>(), {
  showTagsCount: 3,
  isShowLikes: true,
  isShowDownloads: true,
  isShowViews: true,
})

const emit = defineEmits(['onTagClick'])

const tagsArray = computed(() => {
  return props.tags ? props.tags.split(",").splice(0, props.showTagsCount) : []
})


</script>

<template>
  <div class="list-item-with-overlay">
    <div class="list-item-wrapper">
      <slot name="listItem"/>
    </div>
    <div class="overlay">
      <div class="overlay__top">
        <TopOverlayField
            type="likes"
            :value="likes"
        />
        <TopOverlayField
            type="views"
            :value="views"
        />
        <TopOverlayField
            type="downloads"
            :value="downloads"
        />
      </div>
      <div class="overlay__bottom">
        <div class="tags-wrapper">
          <button
              v-for="tag in tagsArray"
              type="button"
              class="tag"
              :title="'search ' + tag"
              @click.prevent.stop="emit('onTagClick', tag)"
          >
            {{ tag }}
          </button>
        </div>
        <div class="custom">
          <slot name="customRight"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-item-with-overlay {
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;

  &:hover .overlay {
    opacity: 1;
    visibility: visible;
  }
}

.list-item-wrapper, .overlay {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
}

.overlay {
  transition: opacity .5s ease, visibility .5s ease;
  opacity: 0;
  top: 0;
  left: 0;
  visibility: hidden;
  position: absolute;
  justify-content: space-between;
  flex-direction: column;
  z-index: 1;
}

.overlay__top,
.overlay__bottom {
  width: 100%;
  padding: 16px;
}

.overlay__top {
  background: linear-gradient(180deg, rgba(25, 27, 38, .7), rgba(25, 27, 38, 0));
}

.overlay__bottom {
  background: linear-gradient(180deg, rgba(25, 27, 38, 0), rgba(25, 27, 38, .7));
}

.overlay__top {
  display: flex;
  color: #eaeaea;
  gap: 15px;
  flex-wrap: wrap;
  font-size: 14px;
}

.tags-wrapper {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

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
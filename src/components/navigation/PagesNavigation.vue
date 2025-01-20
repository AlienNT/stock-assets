<script setup lang="ts">
import {useRouter} from "vue-router";
import {computed, reactive} from "vue";
import imagesHelper from "@/helpers/imagesHelper.ts";

export interface NavigationInterface {
  name: string,
  path: string,
  title: string,
}

export interface PageNavigationPropsInterface {
  navigation?: NavigationInterface[],
  showBackButton?: boolean,
  backButtonText?: string,
}

const props = withDefaults(defineProps<PageNavigationPropsInterface>(), {
  backButtonText: 'back',
  showBackButton: true,
  showBackButtonText: true
})

const {back} = useRouter()

const state = reactive({
  navigation: [
    {
      name: "Images",
      path: "/",
      title: "Images",
    },
    {
      name: "Videos",
      path: "/videos",
      title: "Videos",
    }
  ]
})

const navigationList = computed(() => {
  return props.navigation || state.navigation;
})

const buttonStyle = computed(() => [
  imagesHelper.BACK ? `background-image: ${imagesHelper.BACK}` : ''
].join('; '))

</script>

<template>
  <nav class="pages-navigation">
    <button
        class="back-button"
        type="button"
        title="Back"
        :style="buttonStyle"
        @click="back()"
    />
    <ul class="pages-navigation-list">
      <li
          v-for="{name, title} in navigationList"
          :key="name"
          class="pages-navigation-list__item"
      >
        <router-link
            :to="{name}"
            class="router-link"
            active-class="router-link--active"
        >
          {{ title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.pages-navigation {
  display: flex;
  gap: 15px;
  flex: 1;
  height: 100%;
  align-items: center;
}

.pages-navigation-list {
  display: flex;
  gap: 15px;
}

.router-link {
  color: #bababa;
  transition: 0.2s ease;
  font-weight: bold;
  font-size: 16px;
}

.router-link--active, .router-link:hover {
  color: #ffffff;
}

.back-button {
  background-position: left center;
  background-size: contain;
  display: flex;
  flex: 1;
  height: 30px;
  width: 30px;
  mask: url("../../../public/svg/back.svg") no-repeat center center / contain;
  background-color: #cccccc;
  cursor: pointer;
  transition: background-color .2s ease;
  &:hover {
    background-color: #ffffff;
  }
}
</style>
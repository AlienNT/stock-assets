<script setup lang="ts">
import {computed, onBeforeMount, reactive} from "vue";
import {setCSSProperty} from "@/helpers/formatHelper.ts";
import BackButton from "@/components/navigation/BackButton.vue";

export interface NavigationInterface {
  name: string,
  path: string,
  title: string,
}

export interface PageNavigationPropsInterface {
  navigation?: NavigationInterface[],
  showBackButton?: boolean,
  backButtonText?: string,
  isMobile?: boolean,
}

const props = withDefaults(defineProps<PageNavigationPropsInterface>(), {
  backButtonText: 'back',
  showBackButton: true,
  showBackButtonText: true,
  isMobile: false,
})

const emit = defineEmits(['onClick'])

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


onBeforeMount(() => {
  setCSSProperty('--openNavHeight', window.innerHeight + 'px');
})

</script>

<template>
  <nav
      class="pages-navigation"
      :class="isMobile && 'mobile'"
  >
    <div class="pages-navigation__wrapper">
      <BackButton
          class="pages-navigation__back-button"
          :show-icon="!isMobile"
          :show-title="isMobile"
          @click="emit('onClick')"
      />
      <ul class="pages-navigation-list">
        <li
            v-for="{name, title} in navigationList"
            :key="name"
            class="pages-navigation-list__item"
            @click="emit('onClick')"
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
    </div>
  </nav>
</template>

<style scoped lang="scss">
.pages-navigation,
.pages-navigation__wrapper,
.pages-navigation-list {
  display: flex;
  //gap: 15px;
}

.pages-navigation,
.pages-navigation__wrapper {
  align-items: center;
}

.router-link, .pages-navigation__back-button {
  padding: 15px;
  display: block;
}

.pages-navigation {
  flex: 1;
  height: 100%;
  align-items: center;
}

.router-link {
  color: #bababa;
  transition: 0.2s ease;
  font-weight: bold;
  font-size: 16px;
}

.router-link--active,
.router-link:hover {
  color: #ffffff;
}

.mobile {
  flex-direction: column;

  .pages-navigation__wrapper,
  .pages-navigation-list {
    flex-direction: column;
    gap: 15px;
  }

  .pages-navigation__back-button,
  .pages-navigation-list {
    text-align: right;
  }

  .pages-navigation__back-button,
  .router-link {
    font-size: 20px;
  }

  .pages-navigation__wrapper {
    margin: auto 0 auto auto;
  }
}

.pages-navigation__back-button {
  .mobile & {
    padding: 15px;
    border-bottom: 2px solid #bababa;
  }
}
</style>
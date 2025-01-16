<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive} from "vue";

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
</script>

<template>
<nav class="pages-navigation">
  <ul class="pages-navigation-list">
    <li
        v-for="{name, title} in state.navigation"
        :key="name"
        class="pages-navigation-list__item"
    >
      <router-link
          :to="{name}"
          class="router-link"
          active-class="router-link--active"
      >
        {{title}}
      </router-link>
    </li>
  </ul>
  <button class="back" type="button" @click="back()">back</button>
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
  font-family: monospace;
  transition: 0.2s ease;
  font-weight: bold;
  font-size: 16px;
}
.router-link--active, .router-link:hover {
  color: #ffffff;
}
</style>
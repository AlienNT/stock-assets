<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, Ref, ref} from "vue";
import {setCSSProperty} from "@/helpers/formatHelper.ts";

const {back} = useRouter()
function historyBack(){
  back()
}

const header: Ref<HTMLElement> = ref(null) as unknown as Ref<HTMLElement>

onMounted(() => {
  setCSSProperty('--headerH', `${header.value.offsetHeight}px`)
})
</script>

<template>
<header class="header" ref="header">
  <ul>
    <li>
      <router-link to="./">Images</router-link>
    </li>
    <li>
      <router-link to="./videos">Videos</router-link>
    </li>
  </ul>
  <button class="back" type="button" @click="historyBack">back</button>
</header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  background: #000;
  padding: 15px;
  z-index: 1;
}
</style>
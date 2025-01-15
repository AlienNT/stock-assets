<script setup lang="ts">
import {useImageStore} from "@/store/imageStore.ts";
import {onMounted, reactive} from "vue";
import LoaderDotted from "@/components/UI/LoaderDotted.vue";
import ImageList from "@/components/image/ImageList.vue";

const {fetchImages, images, totalImages} = useImageStore()
const {request, isLoading} = fetchImages()

const state = reactive({
  page: 1,
  perPage: 20,
})

onMounted(() => {
  loadImages()
})

function loadImages() {
  if (totalImages.value <= state.page * state.page) return

  request({
    per_page: state.perPage,
    page: state.page
  })
}
function onScrolled() {
  state.page++
  loadImages()
}

</script>

<template>
  <section class="images-page">
   <div class="container">
     <ImageList
         :images="images"
         @on-scrolled="onScrolled"
     />
     <div class="counter">
       <transition appear name="fade">
         <LoaderDotted v-if="isLoading"/>
       </transition>
     </div>
   </div>
  </section>
</template>

<style scoped>

</style>
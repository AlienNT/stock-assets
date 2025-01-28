<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useUtils } from '@/composables/useUtils.ts'
import TheMain from '@/TheMain.vue'
import TheHeader from '@/TheHeader.vue'
import TheFooter from '@/TheFooter.vue'

const { setIsMobileDevice, setIsMobileScreen, isFocusedScreen, setIsFocusedScreen, isMobileScreen } = useUtils()

onMounted(() => {
  setIsMobileScreen()
  setIsMobileDevice()

  addEventListener('resize', () => {
	setIsMobileScreen()
  })

  addEventListener('blur', () => {
	setIsFocusedScreen(false)
  })

  addEventListener('focus', () => {
	setIsFocusedScreen(true)
  })
})

onBeforeUnmount(() => {
  removeEventListener('resize', () => {
	setIsMobileScreen()
  })
})

watch(() => isFocusedScreen.value, (value) => {
  document.title = !value ?
	  String.fromCharCode(9214) + ' Stock Assets' :
	  'Stock Assets'
})

watch(() => isMobileScreen.value, (value) => {
  if (value) {
	document.body.classList.add('mobile-screen')
  } else {
	document.body.classList.remove('mobile-screen')
  }
})

</script>

<template>
  <TheHeader />
  <TheMain />
  <TheFooter />
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-scroll-content {
  .custom-scroll-bar {
	height: calc(var(--headerH) - var(--vh));
  }
}

</style>

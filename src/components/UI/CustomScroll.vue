<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { debounce } from '@/helpers/templateHelper.ts'

interface CustomScrollPropsInterface {
  maxHeight?: string;
}

const props = withDefaults(defineProps<CustomScrollPropsInterface>(), {
  maxHeight: '859px'
})

const container = ref(undefined as unknown as HTMLElement)
const content = ref(undefined as unknown as HTMLElement)
const thumb = ref(undefined as unknown as HTMLElement)


const state = reactive({
  scrollHeight: 60,
  scrollPosition: 0,
  offsetY: 0,
  mouseDown: false,
  shiftY: 0,
  isShow: false
})

const style = computed(() => [
  `max-height: ${props.maxHeight}`
].join('; '))

const scrollBarThumbStyle = computed(() => [
  `height: ${state.scrollHeight}%`,
  `top: ${state.scrollPosition}%`
].join('; '))

onMounted(() => {
  setScrollParams()
  // addEventListener('mousedown', onMouseDown)
  // addEventListener('mousemove', onMouseMove)
  // addEventListener('mouseup', onMouseUp)
})

const setIsShow = debounce(() => state.isShow = false, 2000)

function onScroll() {
  state.isShow = true
  setIsShow()
  setScrollParams()
}

function getScrollParams() {
  const { scrollTop, offsetHeight } = container.value

  const contentHeight = content.value.offsetHeight
  const scrollHeight = 100 / (contentHeight / offsetHeight)
  const scrollPosition = (100 / contentHeight) * (scrollTop || 1)

  return {
	scrollHeight,
	scrollPosition
  }
}

function setScrollParams() {
  const { scrollHeight, scrollPosition } = getScrollParams()

  state.scrollHeight = scrollHeight
  state.scrollPosition = scrollPosition
}

function onDrag(event: DragEvent) {
  const { scrollTop } = container.value
  const { shiftY } = getPosition(event)
  const contentHeight = content.value.offsetHeight
  const positionPercent = (100 / contentHeight) * ((scrollTop - shiftY) || 1)

  const { clientY, offsetY, screenY } = event


  console.log({
	clientY, offsetY, screenY
  })

  if (event.screenX === 0 && event.screenY === 0) {
	return
  }
  state.scrollPosition = positionPercent
  container.value.scrollTo({
	top: scrollTop + event.offsetY,
	behavior: 'instant'
  })
}

function getPosition(event: MouseEvent) {
  const target = thumb.value
  const {clientY} = event


  const { top, left } = getCoords(target)

  const shiftX = event.pageX - left
  const shiftY = clientY - top

  return {
	shiftX,
	shiftY
  }
}


function getCoords(elem: HTMLElement) { // кроме IE8-
  let box = elem.getBoundingClientRect()

  console.log({ box, parent: elem.offsetParent })

  return {
	top: box.top + (elem.offsetParent?.scrollTop || 0),
	left: box.left + (elem.offsetParent?.scrollLeft || 0)
  }

}


</script>

<template>
  <div
	  class="custom-scroll"
	  ref="container"
	  :style="style"
	  @scroll="onScroll"
  >
	<div
		class="custom-scroll-content"
		ref="content"
	>
	  <slot name="default" />
	</div>
	<transition name="fade" appear>
	  <div class="custom-scroll-bar" v-if="state.isShow">
		<div class="custom-scroll-bar__track">
		  <div
			  class="custom-scroll-bar__thumb"
			  ref="thumb"
			  :style="scrollBarThumbStyle"
			  draggable="false"
			  @drag="onDrag"
		  />
		</div>
	  </div>
	</transition>
  </div>
</template>

<style scoped lang="scss">
.custom-scroll {
  height: 100%;
  overflow-y: scroll;
  position: relative;
  //display: flex;
  scrollbar-width: none;
}

.custom-scroll-bar {
  flex: none;
  position: fixed;
  z-index: 999;
  right: 0;
  top: 0;
  height: 100%;
  width: 8px;
  padding: 2px;
}

.custom-scroll-bar__track {
  background: transparent;
  height: 100%;
  width: 100%;
  position: relative;
}

.custom-scroll-bar__thumb {
  position: absolute;
  width: 100%;
  background: #7373bf;
  border-radius: 5px;
}
</style>
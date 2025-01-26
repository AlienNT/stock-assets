<script setup lang="ts">

import VLogo from '@/components/UI/VLogo.vue'
import FooterLinks from '@/components/footer/FooterLinks.vue'
import { computed } from 'vue'
import appConfig from './configs/appConfig'

const links = computed(() => [
  appConfig.AUTHOR_LINK,
  appConfig.SOURCE_LINK,
  appConfig.API_SOURCE_LINK
])
</script>

<template>
  <footer class="footer">
	<div class="container">
	  <div class="row">
		<VLogo class="col" />
		<FooterLinks :links="links" />
	  </div>
	</div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: #000;
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
<script setup lang="ts">
import FooterLinksItem, { FooterLinkItemPropsInterface } from '@/components/footer/FooterLinksItem.vue'

export interface FooterLinksPropsInterface {
  links: FooterLinkItemPropsInterface[]
}

defineProps<FooterLinksPropsInterface>()
</script>

<template>
  <div class="col footer-links">
	<ul class="row">
	  <FooterLinksItem
		  v-for="({href, title, linkTitle}) in links"
		  :key="href"
		  class="col footer-col"
		  :title="title"
		  :href="href"
		  :link-title="linkTitle"
		  target="_blank"
	  />
	</ul>
  </div>
</template>

<style scoped lang="scss">
.footer-links {
  display: flex;
  flex: 1;
  justify-content: flex-end;

  ul {
	gap: 15px;
  }

  .footer-col {
	display: flex;
	align-items: center;
  }
}
</style>
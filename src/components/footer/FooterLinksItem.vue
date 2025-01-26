<script setup lang="ts">
export interface FooterLinkItemPropsInterface {
  title: string | undefined;
  href: string,
  linkTitle: string
  target?: '_blank' | undefined
}

defineProps<FooterLinkItemPropsInterface>()
</script>

<template>
  <li class="footer-link">
	<span v-if="title" class="footer-link__title">
	  {{ title }}
	</span>
	<a
		class="footer-link__link"
		:href="href"
		:target="target"
	>
	  {{linkTitle}}
	</a>
  </li>
</template>

<style scoped lang="scss">
@use 'sass:color';
$textColor: #8f8f8f;
$linkColor: #585a9a;

.footer-link__title,
.footer-link__link  {
  &:first-letter {
	text-transform: uppercase;
  }
}

.footer-link {
  margin: auto;
  color: $textColor;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 5px;
  flex-wrap: nowrap;
}

.footer-link__link {
  font-weight: 700;
  color: $linkColor;
  transition: color .2s ease;

  &:hover {
	color: color.scale($linkColor, $lightness: 20%);
  }
}
</style>
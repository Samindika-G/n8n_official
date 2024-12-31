<script setup lang="ts">
import type { FrontendSettings } from '@n8n/api-types';
import { computed, onMounted, useCssModule, useTemplateRef } from 'vue';
import { useFavicon } from '@vueuse/core';

// import LogoIcon from './logo-icon.svg';
// import LogoText from './logo-text.svg';

const props = defineProps<
	(
		| {
				location: 'authView';
		  }
		| {
				location: 'sidebar';
				collapsed: boolean;
		  }
	) & {
		releaseChannel: FrontendSettings['releaseChannel'];
	}
>();

const { location, releaseChannel } = props;

const showLogoText = computed(() => {
	if (location === 'authView') return true;
	return !props.collapsed;
});

const $style = useCssModule();
const containerClasses = computed(() => {
	if (location === 'authView') {
		return [$style.logoContainer, $style.authView];
	}
	return [
		$style.logoContainer,
		$style.sidebar,
		props.collapsed ? $style.sidebarCollapsed : $style.sidebarExpanded,
	];
});

const svg = useTemplateRef<{ $el: Element }>('logo');
onMounted(() => {
	if (releaseChannel === 'stable' || !('createObjectURL' in URL)) return;

	const logoEl = svg.value!.$el;

	// Change the logo fill color inline, so that favicon can also use it
	const logoColor = releaseChannel === 'dev' ? '#838383' : '#E9984B';
	logoEl.querySelector('path')?.setAttribute('fill', logoColor);

	// Reuse the SVG as favicon
	const blob = new Blob([logoEl.outerHTML], { type: 'image/svg+xml' });
	useFavicon(URL.createObjectURL(blob));
});
</script>

<template>
	<div :class="containerClasses" data-test-id="n8n-logo">
		<span :class="$style.logoText">LegisFutura</span>
		<div v-if="showReleaseChannelTag" size="small" round :class="$style.releaseChannelTag">
			{{ releaseChannel }}
		</div>
	</div>
</template>

<style lang="scss" module>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');

.logoContainer {
	display: flex;
	justify-content: center;
	align-items: center;
}

.logoText {
	font-family: 'Merriweather';
	font-size: 12px;
	font-weight: bold;
	color: var(--color-text-dark);
}

.authView {
	transform: scale(2);
	margin-bottom: var(--spacing-xl);
}

.sidebar {
	transform: scale(1.3);
}

.sidebarExpanded .logoText {
	margin-left: var(--spacing-xs);
}

.sidebarCollapsed .logoText {
	// width: 6px;
	display: none;
	padding: 0 var(--spacing-4xs);
}
</style>

import type { AppliedThemeOption, ThemeOption } from '@/Interface';
import { useStorage } from '@/composables/useStorage';
import { LOCAL_STORAGE_THEME } from '@/constants';

const themeRef = useStorage(LOCAL_STORAGE_THEME);

export function addThemeToBody(theme: AppliedThemeOption) {
	window.document.body.setAttribute('data-theme', theme);
}

export function isValidTheme(theme: string | null): theme is AppliedThemeOption {
	return theme === 'light';
}

// query param allows overriding theme for demo view in preview iframe without flickering

function getQueryParam(paramName: string): string | null {
	return new URLSearchParams(window.location.search).get(paramName);
}

export function updateTheme(theme: ThemeOption) {
	addThemeToBody('light'); // Always set light theme
	themeRef.value = 'light';
}

export function getPreferredTheme(): AppliedThemeOption {
	return 'light'; // Always return light theme
}

export function getThemeOverride() {
	return getQueryParam('theme') || themeRef.value;
}

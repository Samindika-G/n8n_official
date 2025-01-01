import { useSettingsStore } from '@/stores/settings.store';

const DEFAULT_TITLE = 'Workflow Automation';

export function useDocumentTitle() {
	const settingsStore = useSettingsStore();
	const { releaseChannel } = settingsStore.settings;
	const suffix =
		!releaseChannel || releaseChannel === 'stable' ? 'n8n' : `n8n[${releaseChannel.toUpperCase()}]`;

	const set = (title: string) => {
		document.title = DEFAULT_TITLE;
	};

	const reset = () => {
		set('');
	};

	return { set, reset };
}

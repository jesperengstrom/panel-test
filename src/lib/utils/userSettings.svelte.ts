import Cookies from 'js-cookie'
import type { UserSettings as UserSettingsType } from '$lib/types/userSettings';

enum availableSettings {
	leftPane = 'leftPane'
}

export class UserSettings {
	private settings: UserSettingsType = $state({});

	constructor(settings: UserSettingsType) {
		this.settings = settings;
	}

	private update(setting: keyof typeof availableSettings, v: any) {
		if (setting in availableSettings) {
			const settingsObj = {
				...this.settings,
				...{ [setting]: v }
			};

			this.settings = settingsObj;
			this.setCookie(settingsObj);
		}
	}

	private setCookie(value: UserSettingsType) {
		Cookies.set('userSettings', JSON.stringify(value), {
			expires: 365,
			secure: true,
			sameSite: 'strict'
		});
	}

	setLeftPaneWidth(width: number) {
		const leftPane = { ...this.settings?.leftPane };
		leftPane.width = width;
		this.update('leftPane', leftPane);
	}

	setLeftPaneOpen(open: boolean) {
		const leftPane = { ...this.settings?.leftPane };
		leftPane.open = open;
		this.update('leftPane', leftPane);
	}

	get leftPane() {
		return this.settings?.leftPane;
	}
}
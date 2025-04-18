import { type UserSettings } from '$lib/types/userSettings';

export const handle = async ({ event, resolve }) => {

	let userSettings: UserSettings = {};
	const settingsCookie = event.cookies.get('userSettings');
	if (settingsCookie) {
		try {
			userSettings = JSON.parse(settingsCookie);
		} catch (e) {
			console.warn('Failed to parse user settings', e);
		}
	}
	event.locals.userSettings = userSettings;

	return resolve(event);
};
export async function load({ data }) {
	const userSettings = data.userSettings;

	return { userSettings };
}
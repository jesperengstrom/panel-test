<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { setUserSettings } from '$lib/contexts/userSettings';
	setUserSettings(page.data.userSettings);

	let { children } = $props();
</script>

<header class="fixed top-0 left-0 bg-green-50 h-(--header-height) w-full z-40 border-b border-b-gray-200"></header>
<main class="pt-(--header-height) min-h-screen">
	{@render children()}
</main>

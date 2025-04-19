<script lang="ts">
  import { getUserSettings } from '$lib/contexts/userSettings';
  import SearchResultCard from './SearchResultCard.svelte';
  const userSettings = getUserSettings();
  const panelOpen = $derived(userSettings.leftPane?.hasOwnProperty('open') ? userSettings.leftPane.open : true);
  const arr = new Array(20)
</script>


<div class="fixed top-(--header-height) h-(--toolbar-height) py-2 px-4 border-b border-b-gray-200 w-full bg-white">
  <button
    class={[panelOpen && 'hidden']}
    onclick={() => userSettings.setLeftPaneOpen(true)}>Open</button>   
</div>
<div class="mt-(--toolbar-height) flex flex-col items-start flex-grow overflow-auto py-2 px-4">
  {#each arr as a}
    <SearchResultCard />
  {/each}
</div>
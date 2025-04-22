<script lang="ts">
  import { getUserSettings } from '$lib/contexts/userSettings';
  import { page } from '$app/state';
  import Draggable from './Draggable.svelte';
  import SearchResultCard from './SearchResultCard.svelte';
  import { DEFAULT_PANEL_WIDTH } from './constants/constants';
  import PreviewPanel from './PreviewPanel.svelte';

  const userSettings = getUserSettings();
  let rightPaneWidth = $state(userSettings.rightPane?.width || DEFAULT_PANEL_WIDTH);
  const rightPaneOpen = $derived(page.url.searchParams.has('preview'));
  let isDragging = $state(false);

  const arr = new Array(20);

  function onDragEnd() {
    userSettings.setRightPaneWidth(Math.round(rightPaneWidth));
  }
</script>

<div 
  style="padding-right: {rightPaneOpen ? rightPaneWidth + 'px' : '0'}"
  class={[
    isDragging ? 'transition-none' : 'transition-all'
  ]}>
  <div class="fixed top-(--header-height) h-(--toolbar-height) flex py-2 px-4 border-b border-b-gray-200 w-full bg-white">
    <button
      class={[userSettings.leftPane?.open && 'hidden']}
      onclick={() => userSettings.setLeftPaneOpen(true)}>Open left</button>
    <button
      class={[userSettings.rightPane?.open && 'hidden']}
      onclick={() => userSettings.setRightPaneOpen(true)}>Open right</button>
  </div>
  <div class="flex flex-col py-2 px-4">
    {#each arr as a, index}
      <SearchResultCard {index} />
    {/each}
  </div>
  <!-- right pane -->
  <nav
    class={[
      'fixed top-(--header-height) bottom-0 right-0 bg-gray-50 transition-transform', 
      rightPaneOpen ? 'translate-x-0' : 'translate-x-full'
    ]}
    style="width: {rightPaneWidth}px">
    <Draggable 
      bind:width={rightPaneWidth}
      bind:isDragging
      side="left"
      minWidth={200} 
      maxWidth={400}
      {onDragEnd} />
    <PreviewPanel />
  </nav>
</div>
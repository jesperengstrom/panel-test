<script lang="ts">
  import FacetPanel from '$lib/components/FacetPanel.svelte';
  import SearchResult from '$lib/components/SearchResult.svelte';
  import Draggable from '$lib/components/Draggable.svelte';
  import { getUserSettings } from '$lib/contexts/userSettings';
  const userSettings = getUserSettings();
  const DEFAULT_LEFT_PANE_WIDTH = 220;
  
  let isDragging = $state(false);
  let leftPaneWidth = $state(userSettings.leftPane?.width || DEFAULT_LEFT_PANE_WIDTH);
  let isOpen =  $derived(typeof userSettings.leftPane?.open === 'boolean' ? userSettings.leftPane.open : true);

  function onDragEnd() {
    userSettings.setLeftPaneWidth(Math.round(leftPaneWidth));
  }
</script>

<div class="flex w-screen">
  <nav 
    class={[
      'fixed top-(--header-height) bottom-0 left-0 bg-gray-50 transition-transform', 
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]}
    style="width: {leftPaneWidth}px">
    <FacetPanel />
    <Draggable 
      bind:width={leftPaneWidth}
      bind:isDragging
      minWidth={200} 
      maxWidth={400}
      {onDragEnd} />
  </nav>
  <div
    style="padding-left: {isOpen === true ? leftPaneWidth + 'px' : '0'}"
    class={[
      'flex flex-col flex-grow max-h-screen transition-all', 
      isDragging ? 'transition-none' : 'transition-all'
    ]}>
    <SearchResult />
  </div>
</div>
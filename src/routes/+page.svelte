<script lang="ts">
  import FacetPanel from '$lib/components/FacetPanel.svelte';
  import SearchResult from '$lib/components/SearchResult.svelte';
  import Draggable from '$lib/components/Draggable.svelte';
  import { getUserSettings } from '$lib/contexts/userSettings';
  import { DEFAULT_PANEL_WIDTH } from '$lib/components/constants/constants';
  
  const userSettings = getUserSettings();
  let isDragging = $state(false);
  let leftPaneWidth = $state(userSettings.leftPane?.width || DEFAULT_PANEL_WIDTH);
  let leftPaneOpen =  $derived(typeof userSettings.leftPane?.open === 'boolean' ? userSettings.leftPane.open : true);

  function onDragEnd() {
    userSettings.setLeftPaneWidth(Math.round(leftPaneWidth));
  }
</script>

<div class="flex max-w-screen">
  <!-- left pane -->
  <nav 
    class={[
      'fixed top-(--header-height) bottom-0 left-0 bg-gray-50 transition-transform overscroll-contain', 
      leftPaneOpen ? 'translate-x-0' : '-translate-x-full',
      !isDragging && 'overflow-y-scroll overflow-x-hidden'
    ]}
    style="width: {leftPaneWidth}px">
    <FacetPanel />
    <Draggable 
      bind:width={leftPaneWidth}
      bind:isDragging
      side="right"
      minWidth={200} 
      maxWidth={400}
      {onDragEnd} />
  </nav>
  <div
    style="padding-left: {leftPaneOpen ? leftPaneWidth + 'px' : '0'}"
    class={[
      'flex flex-col flex-grow max-h-screen transition-all', 
      isDragging ? 'transition-none' : 'transition-all'
    ]}>
    <SearchResult />
  </div>
</div>
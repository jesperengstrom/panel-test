<script lang="ts">
  import FacetPanel from '$lib/components/FacetPanel.svelte';
  import SearchResult from '$lib/components/SearchResult.svelte';
  import SplitPane from '$lib/components/SplitPane.svelte';
import { getUserSettings } from '$lib/contexts/userSettings';
  const userSettings = getUserSettings();
  const DEFAULT_LEFT_PANE_WIDTH = 220;

  let leftPaneWidth = userSettings.leftPane?.width || DEFAULT_LEFT_PANE_WIDTH;
  let isOpen =  $derived(typeof userSettings.leftPane?.open === 'boolean' ? userSettings.leftPane.open : true);

  function onDragEnd(width: number) {
    userSettings.setLeftPaneWidth(Math.round(width));
  }
</script>

<div class="flex w-screen">
  <SplitPane 
    initialWidth={leftPaneWidth}
    minWidth={200}
    maxWidth={400}
    {isOpen} 
    {onDragEnd}>
    {#snippet a()}
      <FacetPanel />
    {/snippet}
    {#snippet b()}
      <SearchResult />
    {/snippet}
  </SplitPane>
</div>

<!-- <div class="flex w-screen">
  <SplitPane initialWidth={width} {isOpen} {onDragEnd}>
    {#snippet a()}
      <FacetPanel />
    {/snippet}
    {#snippet b()}
      <SplitPane initialWidth={100} isOpen={true} onDragEnd={() => {}} >
        {#snippet a()}
        <SearchResult />
        {/snippet}
        {#snippet b()}
          <p>Hi</p>
        {/snippet}
      </SplitPane>
    {/snippet}
  </SplitPane>
</div> -->
<script lang="ts">
  import { getUserSettings } from '$lib/contexts/userSettings';
  const userSettings = getUserSettings();
  const arr = new Array(50);
</script>

<div class="facet-panel">
  <div class="h-(--toolbar-height) py-2 px-4 border-b border-b-gray-200 w-full">
    <button onclick={() => userSettings.setLeftPaneOpen(false)}>Close</button>
  </div>
  <ol class="py-2 px-4 list-disc list-inside">
    {#each arr as a}
      <li class="whitespace-nowrap overflow-hidden overflow-ellipsis">
        Lorem ipsum dolor sit amet consectetur
      </li>
    {/each}
  </ol>
</div>
<script lang="ts">
  import { getUserSettings } from '$lib/contexts/userSettings';
  const userSettings = getUserSettings();
  const arr = new Array(50);
</script>

<div class="h-(--toolbar-height) sticky top-0 py-2 px-4 border-b bg-gray-50 border-b-gray-200 w-full flex items-center">
  <button onclick={() => userSettings.setLeftPaneOpen(false)}>Close</button>
</div>
<ol class="py-2 px-4 list-disc list-inside">
  {#each arr as a}
    <li class="whitespace-nowrap overflow-hidden overflow-ellipsis">
      Lorem ipsum dolor sit amet consectetur
    </li>
  {/each}
</ol>
<script lang="ts">
  const { index } = $props();
</script>

<a 
  href={`/?preview=${index}`} 
  aria-label="search card" 
  class="w-full border-b border-b-gray-200 px-2 py-4 flex gap-4"
  data-sveltekit-noscroll>
  <div class="h-12 w-12 bg-gray-100"></div>
  <div class="flex-1 flex flex-col gap-2">
    <div class="h-2 bg-gray-100 rounded-sm"></div>
    <div class="h-2 bg-gray-100 rounded-sm"></div>
    <div class="h-2 bg-gray-100 rounded-sm"></div>
  </div>
</a>
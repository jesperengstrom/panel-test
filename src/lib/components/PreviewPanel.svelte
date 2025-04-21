<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="h-(--toolbar-height) sticky top-0 py-2 px-4 border-b bg-gray-50 border-b-gray-200 w-full flex justify-end items-center">
  <a href="/">X</a>
</div>
<span class="py-2 px-4 text-center text-6xl">{ page.url.searchParams.get('preview') || '' }</span>
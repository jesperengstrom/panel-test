<script lang="ts">
  import { getUserSettings } from '$lib/contexts/userSettings';
  const userSettings = getUserSettings();
  const DEFAULT_LEFT_PANE_WIDTH = 220;

  let width = userSettings.leftPane?.width || DEFAULT_LEFT_PANE_WIDTH;
  let originalWidth = width;
  let originalClientX = width;
  let isDragging = false;
  let isOpen =  typeof userSettings.leftPane?.open === 'boolean' ? userSettings.leftPane.open : true;

  function handlePointerDown(e: PointerEvent) {
    e.preventDefault();

    originalWidth = width;
    originalClientX = e.clientX;
    isDragging = true;

    const onPointerMove = (e: PointerEvent) => {
      // if (e.clientX < 50) {
      //   isOpen = false;
      // } else {
      //   isOpen = true
      // }

      const newWidth = originalWidth + e.clientX - originalClientX;
      width = Math.min(Math.max(newWidth, 200), 400);
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      isDragging = false;
      userSettings.setLeftPaneWidth(Math.round(width));
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp, { once: true });
  }
</script>

<div class="flex w-screen">
  <!-- left pane -->
  <nav
    class="facet-panel fixed top-0 bottom-0 left-0 pt-(--header-height) bg-gray-50 transition-transform ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300"
    class:isDragging={"cursor-col-resize shadow-[rgba(0,0,0,0.2)_-2px_0px_0px_0px_inset]"}
    class:!isDragging={"shadow-[rgba(0,0,0,0.04)_-2px_0px_0px_0px_inset]"}
    class:translate-x-0={isOpen === true}
    class:-translate-x-full={isOpen === false}
    style="width: {width}px"
  >
  <div class="h-(--toolbar-height) py-2 px-4 border-b border-b-gray-200 w-full">
    <button onclick={() => {
      isOpen = false;
      userSettings.setLeftPaneOpen(false);
      }}>Close</button>
  </div>
    <div class="flex flex-col py-2 px-4">
      Left pane
    </div>
    <!-- drag -->
    <div class="absolute z-10 right-0 w-px bg-gray-200 flex-grow-0 top-0 bottom-0">
      <div
        class="absolute -left-[5px] w-3 h-full cursor-col-resize shrink-0"
        onpointerdown={handlePointerDown}>
      </div>
    </div>
  </nav>
  <!-- right pane -->
  <div
    style="padding-left: {isOpen === true ? width + 'px' : '0'}"
    class="flex flex-col flex-grow max-h-screen"
    class:transition-none={isDragging}
    class:transition-all={!isDragging}
    class:ease-[cubic-bezier(0.165,0.84,0.44,1)]={true}
    class:duration-300={!isDragging}
  >
  <div class="h-(--toolbar-height) py-2 px-4 border-b border-b-gray-200 w-full">
      <button
        class={[isOpen && 'hidden']}
        onclick={() => {
          isOpen = true;
          userSettings.setLeftPaneOpen(true);
        }}>Open</button>   
  </div>
    <div class="flex flex-col items-start flex-grow overflow-auto py-2 px-4">
      <h1>Right pane</h1>
    </div>
  </div>
</div>

<style>
  .facet-panel {
    min-height: calc(100vh - var(--header-height));
  }
</style>
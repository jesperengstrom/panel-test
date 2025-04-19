<script lang="ts">
  import type { Snippet } from 'svelte';

  type SplitPaneProps = {
    a?: Snippet;
    b?: Snippet;
    initialWidth: number;
    minWidth: number;
    maxWidth: number;
    isOpen: boolean;
    onDragEnd: (number) => void;
  }

  const { a, b, initialWidth, minWidth, maxWidth, isOpen, onDragEnd }: SplitPaneProps = $props();

  let width = $derived(initialWidth);
  let originalWidth = $derived(width);
  let originalClientX = $derived(width);
  let isDragging = $state(false);

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
      width = Math.min(Math.max(newWidth, minWidth), maxWidth);
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      isDragging = false;
      onDragEnd(width);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp, { once: true });
  }
</script>

<div 
  class="fixed top-(--header-height) bottom-0 left-0 bg-gray-50 transition-transform ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300"
  class:isDragging={"cursor-col-resize shadow-[rgba(0,0,0,0.2)_-2px_0px_0px_0px_inset]"}
  class:!isDragging={"shadow-[rgba(0,0,0,0.04)_-2px_0px_0px_0px_inset]"}
  class:translate-x-0={isOpen === true}
  class:-translate-x-full={isOpen === false}
  style="width: {width}px">
  {@render a?.()}
  <!-- drag -->
  <div class="absolute z-10 right-0 w-px bg-gray-200 flex-grow-0 top-0 bottom-0">
    <div
      class="absolute -left-[5px] w-3 h-full cursor-col-resize shrink-0"
      onpointerdown={handlePointerDown}>
    </div>
  </div>
</div>
<div
  style="padding-left: {isOpen === true ? width + 'px' : '0'}"
  class="flex flex-col flex-grow max-h-screen"
  class:transition-none={isDragging}
  class:transition-all={!isDragging}
  class:ease-[cubic-bezier(0.165,0.84,0.44,1)]={true}
  class:duration-300={!isDragging}>
  {@render b?.()}
</div>
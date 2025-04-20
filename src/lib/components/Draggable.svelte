<script lang="ts">
  type DraggableProps = {
    width: number;
    isDragging: boolean;
    minWidth: number;
    maxWidth: number;
    onDragEnd: () => void;
  }

  let { 
    width = $bindable(), 
    isDragging = $bindable(), 
    minWidth, maxWidth, 
    onDragEnd 
  }: DraggableProps = $props();

  let originalWidth = $derived(width);
  let originalClientX = $derived(width);

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
      onDragEnd();
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp, { once: true });
  }
</script>

<div class="absolute z-10 right-0 w-px bg-gray-200 flex-grow-0 top-0 bottom-0">
  <div
    class="absolute -left-[5px] w-3 h-full cursor-col-resize"
    onpointerdown={handlePointerDown}>
  </div>
</div>
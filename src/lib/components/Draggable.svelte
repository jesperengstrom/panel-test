<script lang="ts">
  type DraggableProps = {
    width: number;
    isDragging: boolean;
    minWidth: number;
    maxWidth: number;
    side: 'left' | 'right'
    onDragEnd: () => void;
  }

  let { 
    width = $bindable(), 
    isDragging = $bindable(), 
    minWidth, 
    maxWidth,
    side,
    onDragEnd 
  }: DraggableProps = $props();

  // let originalWidth = $derived(width);
  // let originalClientX = $derived(width);

  function handlePointerDown(e: PointerEvent) {
    e.preventDefault();

    // originalWidth = width;
    // originalClientX = e.clientX;
    isDragging = true;

    const onPointerMove = (e: PointerEvent) => {
      // if (e.clientX < 50) {
      //   isOpen = false;
      // } else {
      //   isOpen = true
      // }

      let pos = 0;
      if (side === 'right') {
        width = Math.min(Math.max(e.clientX, minWidth), maxWidth);
      }
      if (side === 'left') {
        // pos = document.body.clientWidth - e.clientX;
        width = Math.min(Math.max(document.body.clientWidth - e.clientX, minWidth), maxWidth);
      }

      // const newWidth = originalWidth + pos - originalClientX;
      // width = Math.min(Math.max(newWidth, minWidth), maxWidth);
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

<div class={`absolute z-10 ${side}-0 w-px bg-gray-200 top-0 bottom-0`}>
  <div
    class="absolute -left-[5px] w-4 h-full cursor-col-resize"
    onpointerdown={handlePointerDown}>
  </div>
</div>
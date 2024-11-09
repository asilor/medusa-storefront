<script>
  import emblaCarouselSvelte from "embla-carousel-svelte";

  let { images } = $props();

  let currentImage = $state(0);
  let totalImages = $derived(images.length);

  let emblaApi;
  const options = {
    duration: 0,
    breakpoints: {
      "(min-width: 768px)": {
        watchDrag: false,
      },
    },
  };

  let full = $state(false);

  let imagePosition = $state({ x: 0, y: 0 });

  function zoomIn(event) {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    imagePosition.x = ((event.pageX - left) / width) * 100;
    imagePosition.y = ((event.pageY - top) / height) * 100;
  }

  function initImages(event) {
    emblaApi = event.detail;
    emblaApi.on("select", updateImage).on("reInit", updateImage);
  }

  function updateImage() {
    currentImage = emblaApi.selectedScrollSnap();
  }

  export function setImage(index) {
    emblaApi.scrollTo(index);
  }
</script>

<div class="flex bg-white {full ? "fixed top-0 right-0 left-0 bottom-0 z-50 p-8" : ""}">
  <div class="flex-col flex-none hidden w-16 mr-4 space-y-4 md:block">
    {#each images as thumbnail, index}
      <img
        src={thumbnail.url}
        alt="Thumbnail"
        class="cursor-pointer p-1 {index === currentImage ? 'ring' : ''}"
        onmouseenter={() => setImage(index)}
      />
    {/each}
  </div>
  <div
    class="relative rounded md:overflow-hidden"
    use:emblaCarouselSvelte={{ options }}
    onemblaInit={initImages}
  >
    <div class="flex space-x-16">
      {#each images as image}
        <button onclick={() => full = !full} class="flex-none object-contain w-full cursor-zoom-in">
          <img
            src={image.url}
            alt="Main"
            class="product-image-position md:hover:scale-200"
            onmousemove={zoomIn}
            style:--product-image-x="{imagePosition.x}%"
            style:--product-image-y="{imagePosition.y}%"
          />
        </button>
      {/each}
    </div>
    <div class="absolute px-1 text-xs rounded-full md:hidden bg-white/80 bottom-2 left-2">
      {currentImage + 1} / {totalImages}
    </div>
  </div>
</div>
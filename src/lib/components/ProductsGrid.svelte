<script>
  import { medusa } from "$lib/medusa";
  import ProductCard from "$lib/components/ProductCard.svelte";

  let { response = {"limit": 0, "offset": 0, "count": 0, "products": []} } = $props();

  let products = $state(response.products);
  let limit = $state(response.limit);
  let offset = $state(response.offset);

  const loadLimit = 8;
  let loadCount = $state(0);
  let autoLoad = $derived(loadCount < loadLimit);
  let sentinel;

  async function loadProducts() {
    const response = await medusa(fetch, `products`);
    products.push(...response.products);
  }

  function resetLoad() {
    loadProducts();
    offset += limit;
    loadCount = 1;
  }

  $effect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && autoLoad) {
          loadProducts().then(() => {
            offset += limit;
            loadCount++;
          });
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  });
</script>

<section class="grid grid-cols-2 gap-2 lg:gap-6 lg:grid-cols-5 md:gap-4 md:grid-cols-4 sm:grid-cols-3">
  {#each products as product}
    <ProductCard {product} />
  {/each}
</section>

<div class="my-10 text-center" bind:this={sentinel}>
  {#if autoLoad}
    <div class="w-8 h-8 mx-auto border-3 rounded-full border-neutral-300 border-l-white spin"></div>
  {:else}
    <button class="px-5 text-lg text-white bg-black rounded-full hover:bg-neutral-800 cursor-pointer" onclick={resetLoad}>Load more</button>
  {/if}
</div>
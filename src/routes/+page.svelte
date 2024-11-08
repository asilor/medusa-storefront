<script>
  import { medusa } from "$lib/medusa";
  
  let { data } = $props();
  let products = $state(data.response.products);
  let limit = $state(data.response.limit);
  let offset = $state(data.response.offset);
  
  const loadLimit = 4;
  let loadCount = $state(0);
  let autoLoad = $derived(loadCount < loadLimit);
  let sentinel;

  async function loadProducts() {
    const response = await medusa(fetch, `products`);
    console.log(response);
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

<svelte:head>
  <title>Asilor ― Buy Online Electronics, Fashion, Sports, Home</title>
</svelte:head>

{#each products as product}
  <a href={`/${product.handle}-${product.id.replace(/^prod_/, '')}`}>
    <img src={product.thumbnail} alt={product.title} class="rounded w-80">
    <h2>{product.title}</h2>
  </a>
{/each}

<div class="my-8 text-center" bind:this={sentinel}>
  {#if autoLoad}
    <div class="w-8 h-8 mx-auto border-2 rounded-full border-neutral-300 border-l-white spin"></div>
  {:else}
    <button class="px-5 text-lg text-white bg-black rounded hover:bg-neutral-800" onclick={resetLoad}>Load more</button>
  {/if}
</div>
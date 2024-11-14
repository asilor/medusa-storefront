<script>
  import ProductsGrid from "$lib/components/ProductsGrid.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";

  let { data } = $props();
  let products = $derived(data.response.products);
</script>

<svelte:head>
  <title>Asilor ― Buy Online Electronics, Fashion, Sports, Home</title>
</svelte:head>

<section class="grid grid-cols-2 gap-2 lg:gap-6 lg:grid-cols-5 md:gap-4 md:grid-cols-4 sm:grid-cols-3 mb-6">
  {#each products as product}
    <ProductCard {product} />
  {/each}
</section>

<ProductsGrid />
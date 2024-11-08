<script>
  import ProductsGrid from "$lib/components/ProductsGrid.svelte";

  let { data } = $props();
  let product = $derived(data.response.product);

  const response = {
    "limit": 0,
    "offset": 0,
    "count": 0,
    "products": []
  };
</script>

<svelte:head>
  <title>{product.title} ― Asilor</title>
</svelte:head>

<h1 class="text-3xl font-medium">{product.title}</h1>
<img src={product.thumbnail} alt={product.title}>

<ProductsGrid {response} />
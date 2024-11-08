<script>
  let { data } = $props();
  let product = $derived(data.response.product);
</script>

<svelte:head>
  <title>{product.title} ― Asilor</title>
</svelte:head>

<h1 class="text-3xl font-medium">{product.title}</h1>
<img src={product.thumbnail} alt={product.title}>
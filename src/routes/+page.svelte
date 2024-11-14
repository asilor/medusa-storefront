<script>
  import ProductsGrid from "$lib/components/ProductsGrid.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Asilor ― Buy Online Electronics, Fashion, Sports, Home</title>
</svelte:head>

<ProductsGrid response={data.response} />
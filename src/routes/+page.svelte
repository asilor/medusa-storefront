<script>
  import { medusa } from "$lib/medusa";
  import ProductsGrid from "$lib/components/ProductsGrid.svelte";

  let { data } = $props();
  let response = data.response;
</script>

<svelte:head>
  <title>Asilor ― Buy Online Electronics, Fashion, Sports, Home</title>
</svelte:head>

<ProductsGrid {response} />
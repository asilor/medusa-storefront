<script>
  let { data } = $props();
  let response = $state(data.response);

  const products = response.products.map(product => {
    return {
      ...product,
      url: product.handle + "-" + product.id.replace(/^prod_/, "")
    };
  });
</script>

{#each products as product}
  <a href={`/${product.url}`}>
    <img src={product.thumbnail} alt={product.title} class="w-80">
    <h2>{product.title}</h2>
  </a>
{/each}

<script>
  let { data } = $props();
  let products = $state(data.response.products);
</script>

<h1>Products</h1>

{#each products as product}
  <a href={`/${product.handle}-${product.id.replace(/^prod_/, '')}`}>
    <img src={product.thumbnail} alt="Product" class="w-80">
    <h2>{product.title}</h2>
  </a>
{/each}

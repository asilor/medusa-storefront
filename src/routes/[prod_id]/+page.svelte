<script>
  let { data } = $props();
  let product = $derived(data.response.product);
</script>

<img src={product.thumbnail} alt="Product" class="w-80">
<h1>{product.title}</h1>
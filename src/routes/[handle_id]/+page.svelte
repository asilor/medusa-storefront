<script>
  import { cart } from "$lib/state/cart.svelte";
  import ProductImages from "$lib/components/ProductImages.svelte";
  import ProductsGrid from "$lib/components/ProductsGrid.svelte";

  let { data } = $props();
  let product = $derived(data.response.product);
  
  let quantity = $state(1);

  let selectedOptVals = $state({});

  let selectedVariant = $derived(product.variants.find(variant =>
    variant.options.every(option => selectedOptVals[option.option_id] === option.id)
  ));

  function selectOption(optionId, valueId) {
    selectedOptVals[optionId] = valueId;
  }

  function addToCart() {
    cart.addToCart(selectedVariant.id, quantity);
    quantity = 1;
  }
</script>

<svelte:head>
  <title>{product.title} ― Asilor</title>
</svelte:head>

<section class="grid md:grid-cols-5 gap-x-8 gap-y-2">
  <div class="col-span-3">
    <ProductImages images={product.images} />
  </div>
  <div class="w-full col-span-2 space-y-2">
    <div class="inline-flex items-center px-1.5 space-x-1 text-orange-400 text-sm border rounded-sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="13px" width="13px">
        <path fill="currentColor" d="M15.89 31.98C8.35 31.98 3 26.75 3 19.55c0-3.83 2.3-7.95 2.4-8.12a1 1 0 0 1 1.84.23c0 .03.61 2.34 1.43 3.62a6.1 6.1 0 0 0 1.73 1.9 18.58 18.58 0 0 1-.22-7.42C11.63 2 17.74.13 18 .06a1 1 0 0 1 1.26 1.15c-.01.05-1.02 5.5 1.12 10.13.2.42.47.9.76 1.4.08-.67.21-1.39.41-2.08a5.86 5.86 0 0 1 2.9-3.73 1 1 0 0 1 1.4 1.1c-.01.06-.3 1.93 1.3 4.59 1.43 2.4 1.85 3.95 1.85 6.93 0 7.2-5.52 12.43-13.11 12.43zM6.1 14.6A14.16 14.16 0 0 0 5 19.55c0 6.04 4.5 10.43 10.89 10.43 6.43 0 11.1-4.39 11.1-10.44 0-2.6-.32-3.82-1.56-5.9a11.3 11.3 0 0 1-1.44-3.62c-.2.32-.38.71-.51 1.19a15.92 15.92 0 0 0-.46 4.64 1 1 0 0 1-1.81.65c-.08-.1-1.86-2.63-2.64-4.32-1.63-3.52-1.6-7.33-1.44-9.52-1.64.96-4.17 3.1-4.98 7.47-.8 4.24.74 8.49.76 8.53a1 1 0 0 1-1.17 1.33 8.6 8.6 0 0 1-5.62-5.38z"/>
      </svg>
      <span>Flash sale</span>
    </div>

    <h1 class="text-2xl font-medium">{product.title}</h1>

    <div class="flex items-start">
      <span class="text-2xl">155.23</span>
      <span class="text-xl pt-0.5 pl-0.5">€</span>
    </div>

    <div class="border border-neutral-300 p-2 pt-2.5 rounded space-y-1.5">
      <div class="w-full h-1 rounded bg-neutral-300">
        <div class="h-1 bg-orange-400 rounded" style="width: 37%;"></div>
      </div>
      <div class="flex justify-between text-xs">
        <span>Left: 37</span>
        <span>Sold: 63</span>
      </div>
    </div>

    <div class="flex items-center space-x-1 text-primary-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18px" width="18px">
        <path fill="none" stroke="currentColor" stroke-width="2" d="m3 7 5.8 5.8a1 1 0 0 0 1.4 0l2.6-2.6a1 1 0 0 1 1.4 0L21 17"/>
        <path fill="none" stroke="currentColor" stroke-width="2" d="M17 17h4v-4"/>
      </svg>
      <span>Lowest price in 30 days</span>
    </div>
    <ul class="pl-4 text-green-600 list-disc">
      <li>Deliveprimary on Friday 25</li>
      <li>Elegible for Free Shipping</li>
    </ul>
    <div>
      <p class="text-lg text-primary-600">Out of Stock</p>
      <p>Expected back in 1 week</p>
    </div>

    <div class="space-y-4">
      {#each product.options as option}
        <div>
          <h3 class="font-medium mb-2">{option.title}</h3>
          <div class="flex space-x-2">
            {#each option.values as value}
              <button
                class="px-4 py-1 border rounded-sm cursor-pointer {selectedOptVals[option.id] === value.id ? "border-black" : "border-neutral-300"}"
                onclick={() => selectOption(option.id, value.id)}
              >
                {value.value}
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="fixed bottom-0 left-0 right-0 p-4 pt-0 bg-white md:relative md:p-0">
      <select 
        class="rounded-sm cursor-pointer border-neutral-300" 
        bind:value={quantity}
      >
        {#each Array(20).fill(0).map((_, i) => i + 1) as quantity}
          <option value={quantity}>{quantity}</option>
        {/each}
      </select>

      <button
        class="w-full px-8 py-1 text-lg text-white rounded bg-primary-600 hover:bg-primary-500 active:scale-95 md:w-auto cursor-pointer"
        onclick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  </div>
</section>

<ProductsGrid />
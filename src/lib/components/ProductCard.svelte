<script>
  import { cart } from "$lib/state/cart.svelte";
  let { product } = $props();

  let quantity = $state(1);
</script>

<div class="space-y-2 rounded hover:scale-105">
  <a href={`/${product.handle}-${product.id.replace(/^prod_/, '')}`} tabindex="-1">
    <img src="{product.thumbnail}" alt="{product.title}" class="bg-neutral-100" width="400px" height="271px" />
  </a>
  <a href={`/${product.handle}-${product.id.replace(/^prod_/, '')}`}>
    <h2 class="py-2 leading-tight">{product.title}</h2>
  </a>
  <div class="flex items-start">
    <span class="text-xl">23.74</span>
    <span class="text-sm pt-0.5 pl-0.5">€</span>
  </div>
  <div class="flex items-center space-x-1 text-sm text-primary-600">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="16px" width="16px">
      <path stroke="currentColor" stroke-width="2" d="M12 7v5l2.5 1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
    <span>Ends: Monday 26, 8:59</span>
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
  <div class="flex items-center space-x-1 text-sm text-primary-600">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18px" width="18px">
      <path fill="none" stroke="currentColor" stroke-width="2" d="m3 7 5.8 5.8a1 1 0 0 0 1.4 0l2.6-2.6a1 1 0 0 1 1.4 0L21 17"/>
      <path fill="none" stroke="currentColor" stroke-width="2" d="M17 17h4v-4"/>
    </svg>
    <span>Lowest price in 30 days</span>
  </div>
  <ul class="pl-4 text-sm text-green-600 list-disc">
    <li>Deliveprimary on Friday 25</li>
    <li>Elegible for Free Shipping</li>
  </ul>
  <button 
    onclick={() => cart.addToCart(product.variants[0].id, quantity)}
    class="px-5 text-lg text-white rounded cursor-pointer bg-primary-600 hover:bg-primary-500 active:scale-95"
  >
    Add to Cart
  </button>
  <div>
    <p class="text-lg text-primary-600">Out of Stock</p>
    <p class="text-sm">Expected back in 1 week</p>
  </div>
</div>
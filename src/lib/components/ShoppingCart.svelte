<script>
    import { cart } from "$lib/state/cart.svelte";
</script>

{#snippet cartItem(item)}
    <li class="flex items-center space-x-3">
        <a href={`/p/${item.product_handle}-${item.product_id.replace(/^prod_/, '')}`} class="w-20">
            <img src={item.thumbnail} alt="Cart Item">
        </a>
        <div>
            <span class="text-lg font-medium">{item.unit_price}€</span>
            <p class="text-neutral-600">{item.variant_title}</p>
            <div class="flex pt-1 space-x-2">
                <select 
                    class="rounded-sm cursor-pointer border-neutral-300" 
                    bind:value={item.quantity}
                    onchange={() => cart.updateItem(item.id, item.quantity)}
                >
                    {#each Array(20).fill(0).map((_, i) => i + 1) as quantity}
                        <option value={quantity}>{quantity}</option>
                    {/each}
                </select>
                <button 
                    onclick={() => cart.removeItem(item.id)}
                    class="border rounded-sm p-[1px] border-neutral-300 hover:bg-neutral-100 cursor-pointer"
                    aria-label="Remove item"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="16px" width="16px">
                        <path stroke="black" stroke-width="2" d="M4 6h16m-4 0-.3-.8c-.2-.8-.4-1.2-.6-1.5a2 2 0 0 0-.8-.6L12.7 3h-1.4l-1.6.1a2 2 0 0 0-.8.6c-.2.3-.4.7-.6 1.5L8 6m10 0v10.2c0 1.7 0 2.5-.3 3.2a3 3 0 0 1-1.3 1.3c-.7.3-1.5.3-3.2.3h-2.4c-1.7 0-2.5 0-3.2-.3a3 3 0 0 1-1.3-1.3c-.3-.7-.3-1.5-.3-3.2V6m8 4v7m-4-7v7"/>
                    </svg>
                </button> 
            </div>
        </div>
    </li>
{/snippet}

<div class="cart fixed flex flex-col top-0 bg-white bottom-0 right-0 w-52 border-neutral-300 border-l {cart.open ? "translate-x-0" : "translate-x-full"}">
    <ul class="flex-1 p-3 space-y-3 overflow-y-auto scrollbar-thin">
        {#each cart.items as item}
            {@render cartItem(item)}
        {/each}
    </ul>
    <div class="p-3 pt-2 pb-4 space-y-2">
        <div>
            <div class="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span class="font-medium">{cart.subtotal}€</span>
            </div>
            <div class="flex justify-between text-sm text-neutral-600">
                <span>Included VAT:</span>
                <span>{cart.tax_total}€</span>
            </div>
        </div>
        <a href="/checkout">
            <button class="w-full px-5 py-1 text-lg text-white rounded-full bg-primary-600 hover:bg-primary-500 active:scale-95 cursor-pointer">Checkout ({cart.num_items})</button>
        </a>
    </div>
</div>

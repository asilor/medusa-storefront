import { medusa } from "$lib/medusa";
import { region } from "$lib/state/region.svelte";

function createCart() {
  let cart = $state({
    id: null,
    items: [],
    total: 0,
    subtotal: 0,
    tax_total: 0,
  });

  let open = $derived(cart.items.length > 0);
  let numItems = $derived(cart.items.reduce((sum, item) => sum + item.quantity, 0));

  async function createCart() {
    const response = await medusa(fetch, "carts", {
      method: "POST",
      body: { region_id: region.id },
    });
    cart = response.cart;
    localStorage.setItem("cart_id", cart.id);
  }

  async function retrieveCart() {
    const cartId = localStorage.getItem("cart_id");
    if (cartId) {
      const response = await medusa(fetch, `carts/${cartId}`);
      cart = response.cart;
    }
  }

  async function getCartId() {
    if (cart.id) return cart.id;
    const cartId = localStorage.getItem("cart_id");
    if (cartId) return cartId;
    await createCart();
    return cart.id;
  }

  async function addToCart(variantId, quantity) {
    const cartId = await getCartId();
    const response = await medusa(fetch, `carts/${cartId}/line-items`, {
      method: "POST",
      body: { variant_id: variantId, quantity },
    });
    cart = response.cart;
  }

  async function updateItem(itemId, quantity) {
    const { cart: updatedCart } = await medusa(fetch, `carts/${cart.id}/line-items/${itemId}`, {
      method: "POST",
      body: { quantity }
    });
    cart = updatedCart;
  }

  async function removeItem(itemId) {
    const response = await medusa(fetch, `carts/${cart.id}/line-items/${itemId}`, {
      method: "DELETE",
    });
    cart = response.parent;
  }

  return {
    get items() {
      return cart.items;
    },
    get total() {
      return cart.total;
    },
    get subtotal() {
      return cart.subtotal;
    },
    get tax_total() {
      return cart.tax_total;
    },
    get open() {
      return open;
    },
    get num_items() {
      return numItems;
    },
    createCart,
    retrieveCart,
    addToCart,
    updateItem,
    removeItem,
  };
}

export const cart = createCart();

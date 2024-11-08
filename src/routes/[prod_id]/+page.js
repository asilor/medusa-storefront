import { medusa } from "$lib/medusa";

export async function load({ fetch, params }) {
  const { prod_id } = params;
  const response = await medusa(fetch, `products/${prod_id}`);
  return { response };
}

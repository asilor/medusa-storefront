import { medusa } from "$lib/medusa";

export async function load({ fetch, params }) {
  const { handle_id } = params;
  const id = handle_id.split("-").pop();
  const response = await medusa(fetch, `products/prod_${id}`);
  return { response };
}

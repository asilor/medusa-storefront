export async function medusa(fetch, endpoint, options = {}) {
  const baseUrl = import.meta.env.VITE_MEDUSA_BACKEND_URL;
  const publishableKey = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY;

  const params = {
    credentials: "include",
    method: options.method || "GET",
    headers: {
      "x-publishable-api-key": publishableKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options.body),
  };

  const response = await fetch(`${baseUrl}/store/${endpoint}`, params);
  return response.json();
}
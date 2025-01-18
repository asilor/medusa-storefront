export const prerender = true;

export function GET() {
  return new Response(
`User-agent: *
Allow: /

Sitemap: https://asilor.com/sitemap.xml`
  );
}

import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    appDir: "bundle",
    output: {
      bundleStrategy: "split",
    },
    paths: {
      base: "",
      assets: "https://cdn.asilor.com",
    },
  },
};

export default config;

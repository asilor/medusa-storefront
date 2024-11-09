<script>
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	import '../app.css';
	let { children } = $props();
</script>

<Header />
<main class="container relative px-3 py-4 mx-auto overflow-x-hidden sm:px-6">
	{@render children()}
</main>
<Footer />
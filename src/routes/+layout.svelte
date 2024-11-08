<script>
	import '../app.css';
	import Header from "$lib/components/Header.svelte";
	let { children } = $props();
</script>

<Header />

<main class="container px-3 py-4 mx-auto sm:px-6">
	{@render children()}
</main>

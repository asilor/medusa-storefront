<script>
	import { cart } from "$lib/state/cart.svelte.js";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import ShoppingCart from "$lib/components/ShoppingCart.svelte";

	import "../app.css";
	let { children } = $props();

	$effect(() => cart.retrieveCart());
</script>

<div class={cart.open ? "lg:mr-52" : "mr-0"}>
	<Header />
	<main class="container relative px-3 py-4 mx-auto overflow-x-hidden sm:px-6">
		{@render children()}
	</main>
	<Footer />
</div>

<ShoppingCart />
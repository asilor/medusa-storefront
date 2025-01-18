<script>
    import { assets } from "$app/paths";

    import SearchBar from "$lib/components/SearchBar.svelte";

    let openMenu = $state(false);

    let hide = $state(false);
    let last = $state(0);

    function handleScroll() {
        const current = scrollY;
        hide = current >= last && current > 50;
        last = current;
    }

    $effect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

{#snippet menuToggle()}
  <button class="mr-2 md:ml-4 rounded-full h-9 w-9 bg-neutral-300/25 text-white flex items-center justify-center cursor-pointer" onclick={() => openMenu = !openMenu}>
    {#if openMenu}
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" class="h-5 w-5">
            <path fill="currentColor" fill-rule="evenodd" d="M16.293 17.707a1 1 0 001.414-1.414L11.414 10l6.293-6.293a1 1 0 00-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293z"/>
        </svg>
    {:else}
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" class="h-5 w-5">
            <path fill="currentColor" fill-rule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"/>
        </svg>
    {/if}
  </button>
{/snippet}

{#snippet localeToggle()}
 <div class="text-white">En / Euro</div>
{/snippet}

<header class="sticky top-0 z-40 bg-black transition {hide ? "md:-translate-y-full -translate-y-1/2" : ""}">
    <nav class="container mx-auto flex flex-wrap md:flex-nowrap items-center justify-between p-3 sm:px-6 pb-2 sm:py-4">
        <div class="flex flex-row-reverse md:flex-row items-center">
            <a href="/" alt="Asilor">
                <img src="{assets}/logos/asilor-logo-white.svg" alt="Asilor Logo" width="125" height="30">
            </a>
            {@render menuToggle()}
        </div>

        <div class="order-3 md:order-2 w-full lg:max-w-md md:max-w-sm mt-3 md:mt-0 md:mx-4">
            <SearchBar />
        </div>

        <div class="flex items-center space-x-3 order-2 md:order-3">
            {@render localeToggle()}
            <div class="rounded-full h-9 w-9 bg-gray-300"></div>
        </div>
    </nav>
</header>
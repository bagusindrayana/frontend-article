<script>
    import "../app.pcss";
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
    } from "flowbite-svelte";
</script>

<svelte:head>
    <title>My Articles 📰!</title>
</svelte:head>
<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <div class="mr-3 h-6 sm:h-9 text-2xl">📰</div>
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >
            My Articles!
        </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        <NavLi href="/" active={true}>Home</NavLi>
        <NavLi href="/about">About</NavLi>
        <NavLi href="/posts">All Post</NavLi>
    </NavUl>
</Navbar>
<main>
    <slot></slot>
</main>

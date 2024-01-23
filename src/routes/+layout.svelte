<script>
    import '$lib/app.css';
    import FontMenu from '$lib/components/FontMenu.svelte';
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<svelte:head>
    <title>Dictionary</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Inter:wght@400;700&family=Lora:ital,wght@0,400;0,700;1,700&display=swap" rel="stylesheet">
</svelte:head>

<div class="container">
    <header>
        <img src="$lib/assets/logo.svg" alt="Dictionary logo">
        <div class="controls">
            <FontMenu />
            <ThemeToggle />
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>
        </div>
    </header>

    <slot />
</div>

<style>
    .container {
        max-width: 777px; /* 737 content + 30 padding x2 */
        margin: 0 auto;
        padding: 0 30px;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 58px 0 52px 0;
    }

    .controls {
        display: flex;
        align-items: center;
    }

    svg {
        color: var(--moon-icon);
    }
</style>

<script>
    export let invalid;
</script>

<div class="input-wrapper">
    <input 
        on:keydown
        class:invalid
        type="text" 
        placeholder="Search for any word…" 
        aria-label="Search" >
    
    {#if invalid}
        <p class="invalid-msg">Whoops, can’t be empty…</p>
    {/if}
</div>

<style>
    .input-wrapper {
        position: relative;
    }
    
    input {
        width: 100%;
        height: 64px;
        border: none;
        outline: none;
        border-radius: 16px;
        padding: 0 24px 0 24px;
        font-size: 20px;
        font-weight: 700;
        color: var(--text-primary);
        background-color: var(--input-bg);
        background-image: url('$lib/assets/icon-search.svg');
        background-repeat: no-repeat;
        background-origin: border-box;
        background-position: right 24px center;
    }

    input::placeholder {
        opacity: 0.35;
    }

    input.invalid {
        border: 1px solid var(--red);
    }

    .invalid-msg {
        font-size: 20px;
        font-weight: 400;
        color: var(--red);
        position: absolute;
        bottom: -32px;
    }

    @media (max-width: 650px) {
        input {
            height: 48px;
            padding: 0 24px 0 24px;
            font-size: 16px;
            background-position: right 17px center;
        }
        .invalid-msg {
            font-size: 14px;
            bottom: -24px;
        }
    }
</style>
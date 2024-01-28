<input 
    on:keydown
    type="text" 
    placeholder="Search for any word…" 
    aria-label="Search" >

<style>
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
</style>
<script>
    import SearchInput from '$lib/components/SearchInput.svelte';
    import { getPhonetic, getAudio } from '$lib/utils/parsingHelpers.js';

    let definitions = [];

    async function getDefinitions(word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`
            throw new Error(message);
        }
        
        return response.json();
    }

    function handleInput(e) {
        if (e.key !== 'Enter') return;
        definitions = getDefinitions(e.currentTarget.value);
        e.currentTarget.value = '';
    }

</script>

<SearchInput on:keydown={handleInput} />

{#await definitions}
    <p>Loading...</p>
{:then definitions}
    {#each definitions as def}
        <div class="header">
            <div class="word-and-phonetic">
                <h1>{def.word}</h1>
                <p class="phonetic">{getPhonetic(def)}</p>
            </div>
            <button type="button" aria-label="Play audio">
                <img src="$lib/assets/icon-play.svg" alt="Triangle play button icon">
            </button>
        </div>
    {/each}
{:catch error}
    <p>{error.message}</p>
{/await}

<style>
    
    h1 {
        font-size: 64px;
        font-weight: 700;
        color: var(--text-primary);
    }

    h2 {
        font-size: 24px;
        font-weight: 700;
        font-style: italic;
        color: var(--text-primary);
    }

    h3 {
        font-size: 20px;
        font-weight: 400;
        color: var(--text-secondary);
    }

    p {
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        color: var(--text-primary);
    }

    p.example {
        color: var(--text-secondary);
    }
    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .word-and-phonetic {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
    }

    .phonetic {
        font-size: 24px;
        font-weight: 400;
        line-height: normal;
        color: var(--purple);
    }

    /* button.play-btn {
        width: 75px;
        height: 75px;
        border-radius: 50%;
    } */

</style>
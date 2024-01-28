<script>
    import SearchInput from '$lib/components/SearchInput.svelte';
    import { getPhonetic, getAudio } from '$lib/utils/parsingHelpers.js';

    let promise = [];

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
        promise = getDefinitions(e.currentTarget.value);
        e.currentTarget.value = '';
    }

</script>

<SearchInput on:keydown={handleInput} />

{#await promise}
    <p>Loading...</p>
{:then data}
    <p>{data.length}</p>
    {#each data as word}

        <div class="header">
            <div class="word-and-phonetic">
                <h1>{word.word}</h1>
                <p class="phonetic">{getPhonetic(word)}</p>
            </div>
            <button class="play-btn" type="button" aria-label="Play audio">
                <div class="play-icon"></div>
            </button>
        </div>

        {#each word.meanings as meaning}
            <div class="part-of-speech">
                <h2>{meaning.partOfSpeech}</h2>
                <div class="divider"></div>
            </div>

            <h3 class="meaning">Meaning</h3>

            <ul>
                {#each meaning.definitions as definition}
                    <li>{definition.definition}</li>
                    {#if definition.example}
                        <p class="example">"{definition.example}"</p>
                    {/if}
                {/each}  
            </ul>

            {#if meaning.synonyms.length > 0}
                <div class="synonyms-container">
                    <h3>Synonyms</h3>
                    <div class="synonym-words">
                        {#each meaning.synonyms as synonym}
                            <button type="button" class="synonym-btn">{synonym}</button>
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}

        <div class="source-container">
            <p class="source-label">Source</p>
            <div class="source-links">
                {#each word.sourceUrls as url}
                    <div class="link">
                        <a href={url}>{url}</a>
                        <img 
                            src="$lib/assets/icon-new-window.svg" 
                            alt="Link opens in new window"
                            target="_blank" >
                    </div>
                {/each}
            </div>
        </div>

    {/each}

    <!-- <p>{data[0].sourceUrls[0]}</p> -->

{:catch error}
    <p>{error.message}</p>
{/await}

<style>
    
    h1 {
        font-size: 64px;
        font-weight: 700;
        color: var(--text-primary);
        margin-top: 45px;
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

    button.play-btn {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        background-color: var(--play-btn-bg);
        display: grid;
        place-items: center;
        transition: background-color 200ms;
    }

    button.play-btn:hover {
        background-color: var(--purple);
    }

    .play-icon {
        width: 0;
        height: 0;
        border-top: 10.5px solid transparent;
        border-left: 21px solid var(--purple);
        border-bottom: 10.5px solid transparent;
        transition: border-left 200ms;
    }

    button.play-btn:hover .play-icon {
        border-left: 21px solid #FFFFFF;
    }

    .part-of-speech {
        display: flex;
        align-items: center;
        margin: 40px 0;
    }

    .divider {
        width: 100%;
        height: 0;
        border-bottom: 1px solid var(--divider);
        margin-left: 20px;
    }

    .meaning {
        margin-bottom: 25px;
    }

    ul {
        list-style: none;
        padding-left: 47px;
    }

    li {
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        color: var(--text-primary);
        margin-bottom: 13px;
    }

    li::before {
        content: "•";
        color: var(--purple);
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        display: inline-block;
        width: 28px;
        margin-left: -28px;
    }
    
    p.example {
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        color: var(--text-secondary);
        margin-bottom: 13px;
    }

    .synonyms-container {
        display: flex;
        align-items: flex-start;
        gap: 22px;
        margin-top: 50px;
    }

    .synonym-words {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }

    button.synonym-btn {
        font-size: 20px;
        font-weight: 700;
        color: var(--purple);
    }

    button.synonym-btn:hover {
        text-decoration: underline;
    }

    .source-container {
        margin-top: 40px;
        margin-bottom: 60px;
        display: flex;
        gap: 20px;
        padding-top: 20px;
        border-top: 1px solid var(--divider);
    }

    .source-label, a {
        font-size: 14px;
        font-weight: 400;
        text-decoration: underline;
    }

    .source-label {
        color: var(--text-secondary);
    }

    .source-links {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }

    .link {
        display: flex;
        align-items: center;
        gap: 9px;
    }

    a {
        color: var(--text-primary);
    }



</style>
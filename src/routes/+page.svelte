<script>
    import SearchInput from '$lib/components/SearchInput.svelte';
    import PlayAudio from '$lib/components/PlayAudio.svelte';
    import { getPhonetic, getAudioSrc } from '$lib/utils/parsingHelpers.js';

    let promise = [];

    async function getDefinitions(word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        if (!response.ok) {
            // const message = `An error has occured: ${response.status}`;
            throw new Error(response.status);
        }
        
        return response.json();
    }

    function handleInput(e) {
        if (e.key !== 'Enter') return;
        promise = getDefinitions(e.currentTarget.value);
        e.currentTarget.value = '';
    }

    function defineSynonym(word) {
        const encoded = encodeURIComponent(word);
        promise = getDefinitions(encoded);
    }

</script>

<SearchInput on:keydown={handleInput} />

{#await promise}
    <p>Loading...</p>
{:then data}
    
    {#each data as word, index}

        <div class="header">
            <div class="word-and-phonetic">
                <h1>
                    {word.word}
                    {#if data.length > 1}
                        <sup>{index + 1}</sup>
                    {/if}
                </h1>
                {#if getPhonetic(word)}
                    <p class="phonetic">{getPhonetic(word)}</p>
                {/if}
            </div>
            {#if getAudioSrc(word)}
                <PlayAudio src={getAudioSrc(word)} />
            {/if}
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
                            <button 
                                type="button" 
                                class="synonym-btn"
                                on:click={() => defineSynonym(synonym)} >
                                {synonym}
                            </button>
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}

        <!-- only display source below the last word -->
        {#if index === data.length - 1}
            <div class="source-container">
                <p class="source-label">Source</p>
                <div class="source-links">
                    {#each word.sourceUrls as url}
                        <div class="link">
                            <a href={url} target="_blank">{url}</a>
                            <img 
                                src="$lib/assets/icon-new-window.svg" 
                                alt="Link opens in new window" >
                        </div>
                    {/each}
                </div>
            </div>
        {/if}

    {/each}

{:catch error}
    <div class="error-container">
        {#if error.message === '404'}
            <p class="error-emoji">😕</p>
            <h4 class="error-heading">No Definitions Found</h4>
            <p class="error-description">We couldn't find any definitions for the word you were looking for. You can try the search again or head to the web instead.</p>
        {:else}
            <p class="error-emoji">😵</p>
            <h4 class="error-heading">Oops... something went wrong</h4>
            <p class="error-description">There was a problem contacting the server. Check your internet connection or try again later.</p>
        {/if}
    </div>
{/await}

<style>
    
    h1 {
        font-size: 64px;
        font-weight: 700;
        color: var(--text-primary);
    }

    sup {
        font-size: 24px;
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
        margin-top: 45px;
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

    .error-container {
        text-align: center;
        margin-top: 132px;
    }

    .error-emoji {
       font-size: 64px; 
       margin-bottom: 44px;
    }

    .error-heading {
       font-size: 20px;
       font-weight: 700; 
       color: var(--text-primary);
       margin-bottom: 24px;
    }

    .error-description {
        font-size: 18px;
        font-weight: 400;
        color: var(--text-secondary);
    }


</style>
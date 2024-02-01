<script>
    export let src;
    let audio;
    const play = () => audio.play();
</script>

<audio {src} bind:this={audio}></audio>

<button 
    on:click={play}
    type="button"
    aria-label="Play audio">
    <div class="play-icon"></div>
</button>

<style>
    button {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        background-color: var(--play-btn-bg);
        display: grid;
        place-items: center;
        transition: background-color 200ms;
    }

    button:hover {
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

    button:hover .play-icon {
        border-left: 21px solid #FFFFFF;
    }

    @media (max-width: 650px) {
        button {
            width: 48px;
            height: 48px;
        }

        .play-icon {
            border-top: 6.5px solid transparent;
            border-left: 13px solid var(--purple);
            border-bottom: 6.5px solid transparent;
        }

        button:hover .play-icon {
            border-left: 13px solid #FFFFFF;
        } 
    }
</style>
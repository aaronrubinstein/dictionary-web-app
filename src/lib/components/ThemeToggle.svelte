<script>
    import { browser } from '$app/environment';

    let darkMode = (browser && localStorage.getItem('theme') === 'dark') || false;
    
    const toggleTheme = () => {
        let newTheme = darkMode ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    }

</script>

<label class="switch" aria-label="Toggle dark/light mode">
    <input type="checkbox" bind:checked={darkMode} on:click={toggleTheme}>
    <span class="slider"></span>
</label>

<style>    
    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
        margin-right: 19px;
    }

    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        background: var(--toggle-bg);
        transition: background-color .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        border-radius: 50%;
        left: 4px;
        bottom: 3px;
        background-color: #FFFFFF;
        transition: .4s;
    }

    input:checked + .slider:before {
        transform: translateX(18px);
    }

    .switch:hover .slider {
        background: var(--purple);
    }
    
</style>
<script>
   import { browser } from '$app/environment';
   import { clickOutside } from '$lib/utils/clickOutside.js';
   

   let currentFont = (browser && localStorage.getItem('font')) || 'sans-serif';

   let menuOpen = false;

   const setFont = font => {
      localStorage.setItem('font', font);
      document.body.setAttribute('data-font', font);
      currentFont = font;
   }

   const fontNames = {
      'sans-serif': 'Sans Serif',
      'serif': 'Serif',
      'mono': 'Mono'
   }


</script>

<div class="container">
   <button type="button" on:click={() => menuOpen = !menuOpen} id="menu-toggle-btn">
      {fontNames[currentFont]}
      <img class:menuOpen src="$lib/assets/icon-arrow-down.svg" alt="Arrow icon">
   </button>

   {#if menuOpen}
      <div class="menu" use:clickOutside on:outclick={() => menuOpen = false}>
         <button type="button" class="menu-item sans" 
            on:click={() => setFont('sans-serif')} >Sans Serif</button>
         <button type="button" class="menu-item serif"
            on:click={() => setFont('serif')} >Serif</button>
         <button type="button" class="menu-item mono"
            on:click={() => setFont('mono')} >Mono</button>
      </div>
   {/if}
</div>


<style>
   .container {
      position: relative;
      display: flex;
      align-items: center;
      height: 32px;
      padding-right: 26px;
      margin-right: 26px;
      border-right: 1px solid var(--vertical-divider);
   }
   
   button {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 18px;
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      color: var(--text-primary);
   }

   img {
      transition: transform 400ms;
   }
   
   img.menuOpen {
      transform: rotate(180deg);
   }

   .menu {
      position: absolute;
      top: 45px;
      right: 26px;
      width: 183px;
      height: 152px;
      border-radius: 16px;
      padding: 24px;
      background: var(--dropdown-bg);
      z-index: 99;
      box-shadow: 0px 5px 30px 0px var(--dropdown-shadow);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
   }

   .menu-item:hover {
      color: var(--purple);
   }

   .menu-item.sans {
      font-family: 'Inter', sans-serif;
   }

   .menu-item.serif {
      font-family: 'Lora', serif;
   }

   .menu-item.mono {
      font-family: 'Inconsolata', monospace;
   }

   @media (max-width: 650px) {
      .container {
         height: 24px;
         padding-right: 16px;
         margin-right: 16px;
      }
      
      button {
         gap: 18px;
         font-size: 16px;
      }

      .menu {
         top: 40px;
         right: 26px;
         width: 160px;
         height: 148px;
      }
   }

</style>
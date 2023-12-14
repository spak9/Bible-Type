<!-- Script -->
<script>
  console.log("+page.svelte /")
  import TypeArea from '$lib/components/TypeArea.svelte'
  import { VerseState } from '$lib/constants/verse_state.js';
  import { TypeAreaStore } from '$lib/stores/TypeAreaStore.js';
  
  export let data;

  // Load up the "TypeAreaStore" with the user's default state
  $TypeAreaStore.verse = data.verse;
</script>


<!-- Markup -->
<div class="h-full flex flex-col justify-center items-center self-center">
  <!-- Must be keyed as we need to reinstantiate TypeArea, not merely update it (see component lifecycle) -->
  {#if $TypeAreaStore.verse === VerseState.Loading}
    <p>Loading...</p>
  {:else if $TypeAreaStore.verse === VerseState.APIError}
    <p>{VerseState.APIError}</p>
  {:else if $TypeAreaStore.verse === VerseState.JSError}
    <p>{VerseState.JSError}</p>
  {:else}
    {#key $TypeAreaStore.restart}
      <TypeArea verse={$TypeAreaStore.verse} />
    {/key}
  {/if}
</div>

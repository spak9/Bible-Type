<!-- Script -->
<script>
  console.log("+page.svelte /")
  import TypeArea from '$lib/components/TypeArea.svelte'
  
  export let data;

  // String of the bible verse text from "bible-api"
  let verse_text = data.verse;

  // String of the error text from "bible-api" on some error
  let error_message = undefined;

  // An event handler for the "getverse" custom event.
	// Updates `verse` component state with new verse
	function onGetVerse(e) {
		let data = e.detail;
		console.log(`ongetverse: ${JSON.stringify(data)}`);
		
		// Check if verse is valid from the API
		if (data.error_message) {
			error_message = data.error_message;
			console.log(`error: ${error_message}`)
		}
		else {
			verse_text = data.verse_text;
			error_message = undefined;
		}
	}
</script>


<!-- Markup -->
<div class="h-full flex flex-col justify-center items-center self-center">
  {#if error_message}
    <h2>{error_message}</h2>
  {:else}
    <!-- Must be keyed as we need to reinstantiate TypeArea, not merely update it (see component lifecycle)-->
    {#key verse_text}
      <TypeArea verse={verse_text} />
    {/key}
  {/if}
</div>

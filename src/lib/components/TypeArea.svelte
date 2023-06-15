<!-- Script -->
<script>
	import { onMount } from 'svelte';
	import Word from '$lib/components/Word.svelte';

	// verse text string user wants - replace new lines
	export let verse = "";
	verse = verse.replace(/(\r\n|\n|\r)/gm, "");

	// times for calculating WPM
	let start_time = undefined;
	let end_time = undefined;

	// Array of "Word" components 
	let words = [];

	// Index to the current "Word" component
	let curr_word_idx = 0

	// handler for "keydown" events
	function onkeydown(e) {
		console.log(`user pressed: ${e.key}`);

		// Call "onkeydown" on current "Word" component
		words[curr_word_idx].onkeydown(e.key);
	}
	
</script>


<!-- Markup -->
<svelte:window on:keydown={onkeydown}/>

<div>
	{#each verse.split(" ") as word, idx}
		{#if (idx === curr_word_idx)}
			<Word 
				bind:this={words[idx]} 
				is_curr_word={true}
				{word}  />
		{:else}
			<Word 
				bind:this={words[idx]} 
				{word}  />
		{/if}
	{/each} 
</div>
 
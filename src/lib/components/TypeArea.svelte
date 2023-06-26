<!-- Script -->
<script>
	import { onMount } from 'svelte';
	import Word from '$lib/components/Word.svelte';

	/**
	 * Props
	 */

	// verse text string user wants - replace new lines
	export let verse = "";
	verse = verse.replace(/(\r\n|\n|\r)/gm, "");

	/**
	 * Internal State
	 */

	// Flag that's switched when user finishes/resets type area.
	let show_results = false;

	// times for calculating WPM
	let start_time = undefined;
	let end_time = undefined;

	// Array of "Word" components 
	let words = [];

	// Index to the current "Word" component
	let curr_word_idx = 0

	// handler for "keydown" events
	function onkeydown(e) {

		// Ignore special/modifier keys
        if (e.key === "Shift" ||
            e.key === "Alt" ||
            e.key === "Control" ||
            e.key === "Meta" ||
            e.key === "CapsLock" ||
            e.key === "Tab") return;

		// Call "onkeydown" on current "Word" component
		words[curr_word_idx].onkeydown(e.key);

		console.log(`user pressed: ${e.key} - curr word index ${curr_word_idx}`);
	}

	// handler for custom "gowordback" "Word" events
	function ongowordbackwards() {
		if (curr_word_idx === 0) {
			// pass
		}
		else {
			curr_word_idx -= 1;
			words[curr_word_idx].updateLastLetter();
		}
	}

	function ongowordforwards() {
		// Reached the end of the verse(s) - end the game
		if (curr_word_idx + 1 === words.length) {
			endGame();
		}
		curr_word_idx += 1;
	}

	function endGame() {
		show_results = true;
	}
	
</script>


<!-- Markup -->
<svelte:window on:keydown={onkeydown}/>

<div>
	{#if show_results === false} 
		{#each verse.split(" ") as word, idx}
			<Word
				on:gowordforward={ongowordforwards}
				on:gowordbackwards={ongowordbackwards}
				bind:this={words[idx]}
				is_curr_word={idx === curr_word_idx ? true : false} 
				{word}
				/>
		{/each}
	{:else}
		<h2>Results are blah</h2>
	{/if}
</div>
 
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
	 * Private State
	 */

	// Flag that's switched when user finishes/resets type area.
	let wpm = undefined;

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

		// Call "onkeydown" on current "Word" component -
		// The moment this happens - game has started
		if (!start_time) {
			console.log("TIME HAS STARTED");
			start_time = new Date();
		}
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
		end_time = new Date();
		wpm = calculateWpm(start_time, end_time)
	}

	function calculateWpm(start_time, end_time) {
		let minutes = (end_time - start_time) / 1000 / 60;
		console.log(minutes);
		let correctly_spelled_letters = 0;
		for (let word of words) {
			let correct_num = word.isWordCorrect();
			// Get correct number of characters PLUS the implied "space"
			if (correct_num) {
				correctly_spelled_letters += (correct_num + 1)
			}
		}
		return Math.round(correctly_spelled_letters / 5 / minutes);
	}
	
</script>


<!-- Markup -->
<svelte:window on:keydown={onkeydown}/>

<div>
	{#if !wpm} 
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
		<h2>{wpm}</h2>
	{/if}
</div>
 
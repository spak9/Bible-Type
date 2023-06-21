<!-- Script -->
<script>
	import { createEventDispatcher } from 'svelte';
	import Letter from '$lib/components/Letter.svelte';

	const dispatch = createEventDispatcher();

	/**
	 * Props
	 */

	// The actual word string
	export let word = undefined;

	// Bool for whether this word is the current word being typed
	export let is_curr_word = undefined;

	/**
	 * Internal State
	 */

	// Array of "letter" objects - main state for a word 
	//  {
	//		letter: str,
	//		is_curr_letter: bool,
	//		is_correct: bool,
	//		is_last_letter: bool
	//  }
	let letter_objects = [];

	// Index for what the current letter in the word
	let curr_letter_idx = 0;

	// Iterate through every letter of the word string
	for (let [idx, l] of [...word].entries()) {
		if (is_curr_word && curr_letter_idx == idx) {
			letter_objects.push({letter: l, is_curr_letter: true, is_correct: undefined, is_last_letter: undefined});
		}
		else {
			letter_objects.push({letter: l, is_curr_letter: false, is_correct: undefined, is_last_letter: undefined});
		}
	}

	export function onkeydown(key) {

		let current_letter_obj = letter_objects[curr_letter_idx];

		console.log(`onkeydown - current letter: ${JSON.stringify(letter_objects[curr_letter_idx])}`)

		// 1. Space was pressed - jump to next letter or word
		if (key === " ") {
			console.log("space was pressed");

			// 1a. Last Letter - dispatch gowordback event
			if (isLastLetter()) {
				dispatch("gowordback");
			}

			// 1b. Not last letter - dispatch
			else {
				console.log("letterForwards");
				letterForwards(current_letter_obj);
			}
		}

		// X. Backspace
		else if (key === "Backspace") {
			if (isFirstLetter()) {
				
			}
			else if (isLastLetter() && current_letter_obj.is_last_letter) {
				letterRestart(current_letter_obj);
				console.log("onback - ", curr_letter_idx);
			}
			else {
				let prior_letter_obj = letter_objects[curr_letter_idx - 1];
				letterRestart(current_letter_obj)
				letterBackwards(prior_letter_obj);
			}
		}

		// X. Correct letter was pressed
		else if (key === current_letter_obj.letter) {
			// Current letter
			current_letter_obj.is_correct = true;
			current_letter_obj.is_curr_letter = false;

			// Check if we're at the end of the Word - move cursor to end of word
			if (word.length === curr_letter_idx + 1) {
				console.log('at the end of word');
				current_letter_obj.is_last_letter = true;
				// current_letter_obj.is_curr_letter = false;
				console.log('here - ', JSON.stringify(current_letter_obj));
			}
			else {	
				curr_letter_idx += 1;
			}
			
		}

		// FINALLY - set up new letter to be "current" letter
		current_letter_obj = letter_objects[curr_letter_idx];
		current_letter_obj.is_curr_letter = true;
		letter_objects = letter_objects;
		console.log(`After keydown: new index is ${curr_letter_idx}, letter is ${JSON.stringify(letter_objects[curr_letter_idx])}`);
	}

	/**
	 * Helper functions for the typing mechanics
	*/

	// Returns a boolean whether the currently typed letter is the last one.
	function isLastLetter() {

		// Get length of the word
		let word_length = letter_objects.length

		if (word_length === curr_letter_idx + 1) {
			return true;
		}
		else {
			return false;
		}
	}

	function isFirstLetter() {
		if (curr_letter_idx === 0) {
			return true;
		}
		else {
			return false;
		}
	}

	function letterRestart(letter_obj) {
		letter_obj.is_curr_letter = undefined;
		letter_obj.is_correct = undefined;
		letter_obj.is_last_letter = undefined;
	}

	function letterForwards(letter_obj) {
		letter_obj.is_curr_letter = false;
		curr_letter_idx += 1;
	}

	function letterBackwards(letter_obj) {
		letter_obj.is_curr_letter = undefined;
		letter_obj.is_correct = undefined;
		letter_obj.is_last_letter = undefined;
		curr_letter_idx -= 1;
	}

	// "Word" event for when the "TypeArea" needs to go back a word
	function goWordBack() { }

	// "Word" event for when the "TypeArea" needs to go forward a word
	function goWordForward() { }

</script>


<!-- Markup --> 
<span>
	{#each letter_objects as letter_obj}
		<Letter 
			letter={letter_obj.letter} 
			is_curr_letter={letter_obj.is_curr_letter}
			is_correct={letter_obj.is_correct}
			is_last_letter={letter_obj.is_last_letter} /> 
	{/each}
</span>


<!-- Styles --> 
<style>
	span {
		font-size: 2rem;
		display: inline-block;
		padding-right: 1rem;
	}
</style>
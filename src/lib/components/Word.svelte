<!-- Script -->
<script>
	import { createEventDispatcher } from 'svelte';
	import Letter from '$lib/components/Letter.svelte';

	/**
	 * Props
	 */

	// The actual word string
	export let word = undefined;

	// Bool for whether this word is the current word being typed
	export let is_curr_word = undefined;

	// Bool for knowing whether this is the last word
	export let is_last_word = undefined;

	/**
	 * Private State
	 */

	// Event Dispatcher
	const dispatch = createEventDispatcher();

	// Array of "letter" objects - main state for a word 
	let letter_objects = [];

	// Index for what the current letter in the word
	let curr_letter_idx = 0;

	// Initialization ONLY - create our letter objects 
	for (let [idx, l] of [...word].entries()) {
		if (is_curr_word && curr_letter_idx == idx) {
			letter_objects.push({letter: l, is_curr_letter: true, is_correct: undefined, is_last_letter: undefined});
		}
		else {
			letter_objects.push({letter: l, is_curr_letter: false, is_correct: undefined, is_last_letter: undefined});
		}
	}

	// Reactively ensure that the current word and its letters are updated 
	// - Last letter implies it should be on the right side of the word
	$: if (is_curr_word === true && !isLastLetter()) {
		letter_objects[curr_letter_idx].is_curr_letter = true;
	}

	// Public function for determining whether the entire "Word" is spelled correctly.
	// Either returns the number of correct letters if fully correct, or 0.
	export function isWordCorrect() {
		for (let letter of letter_objects) {
			if (letter.is_correct !== true) {
				return 0;
			}
		}
		return letter_objects.length;
	}

	// Public function that checks whether the last position is on the
	// last letter, if so, 
	export function updateLastLetter() {
		if (isLastLetter()) {
			letter_objects[curr_letter_idx - 1].is_last_letter = true;
		}
	}

	// Public method that allows a "Word" instance to manipulate its internal letters.
	// Takes in "key" which is a string and has various cases based on that "key"
	//
	// Must do the following:
	// 1. Branch off correct based on the class of key input (eg. space, back, correct)
	// 2. Every branch/function must fully update that "Letter" object and possibly the letter before/after.
	// 3. Every branch/function must update the "curr_letter_idx" for the next current letter.
	// 4. Finally, re-render our UI by letter object assignments
	export function onkeydown(key) {

		// ALWAYS start with the current letter - index may be the length of the word, meaning
		// it's at the end of the word and the text cursor is on the right side, being undefined.
		let current_letter_obj = letter_objects[curr_letter_idx];

		console.log(`onkeydown - current letter: ${JSON.stringify(letter_objects[curr_letter_idx])}`)

		// 1. Space was pressed - jump to next word
		if (key === " ") {
			wordForwards(current_letter_obj);
		}

		// 2. Backspace
		else if (key === "Backspace") {
			if (isFirstLetter()) {
				wordBackwards(current_letter_obj);
			}
			else if (isLastLetter()) {
				console.log('BACK - IS LAST LETTER');

				// eg. "For" will have index 3; need to get 2
				curr_letter_idx -= 1
				current_letter_obj = letter_objects[curr_letter_idx];
				
				if (current_letter_obj.is_appended === true) {
					letter_objects.pop();
					letter_objects[curr_letter_idx - 1].is_last_letter = true;
				}
				else {
					letterReset(current_letter_obj);
				}
			}
			else {
				letterBackwards(current_letter_obj);
			}
		}

		// 3. Correct letter was pressed - current letter will be null at the end
		else if (key === current_letter_obj?.letter) {

			// Current letter - update to be correct
			letterCorrect(current_letter_obj);
			
		}

		// 4. Incorrect letter must have been pressed
		else {

			// At the end of the word - reference will not exist
			if (!isLastLetter()) {
				letterIncorrect(current_letter_obj);
			}
			else {
				letterAdd(key);
			}

		}

		// Re-render new "Letter" state
		letter_objects = letter_objects;
		console.log(`After keydown: new index is ${curr_letter_idx}, letter is ${JSON.stringify(letter_objects[curr_letter_idx])}`);
	}

	/**
	 * Helper functions for the typing mechanics
	*/

	// Returns a boolean whether the currently typed letter is the last one.
	function isLastLetter() {

		if (letter_objects.length === curr_letter_idx) {
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

	function letterIncorrect(letter_obj) {
		letter_obj.is_correct = false;
		letter_obj.is_curr_letter = false;
		curr_letter_idx += 1;

		// special case - if last letter, move cursor to the right and don't update index
		if (isLastLetter()) {
			letter_obj.is_last_letter = true;
			return;
		}
	}

	function letterCorrect(letter_obj) {
		letter_obj.is_correct = true;
		letter_obj.is_curr_letter = false;
		curr_letter_idx += 1;

		// special case - if last letter, move cursor to the right
		if (isLastLetter()) {
			letter_obj.is_last_letter = true;

			// game over - last letter of last word was 
			if (is_last_word) {
				dispatch("gowordforward");
			}
			return;
		}
	}

	function letterAdd(key) {
		// First, access the (index - 1) letter, as the current one MUST be undefined due to the last letter
		let letter_obj = letter_objects[curr_letter_idx - 1];
		letter_obj.is_last_letter = false;

		// Next, create a new letter object 
		let appended_letter = 
			{
				letter: key, 
				is_curr_letter: false, 
				is_correct: undefined, 
				is_last_letter: true,
				is_appended: true
			};
		letter_objects.push(appended_letter);
		curr_letter_idx += 1;
	}

	function letterReset(letter_obj) {
		letter_obj.is_curr_letter = undefined;
		letter_obj.is_correct = undefined;
		letter_obj.is_last_letter = undefined;
		letter_obj.is_appended = undefined;
	}

	// Updates two letters - the current & prior letter to "restart"
	function letterBackwards(letter_obj) {
		letterReset(letter_obj);
		curr_letter_idx -= 1;
		let prior_letter_obj = letter_objects[curr_letter_idx];
		letterReset(prior_letter_obj);
	}

	function wordForwards(letter_obj) {
		if (isLastLetter()) {
			// "letter_obj" will be undefined as it's an index too far
			let prior_letter_obj = letter_objects[curr_letter_idx - 1];
			prior_letter_obj.is_last_letter = false;
		}
		else {
			letter_obj.is_curr_letter = false;
		}
		dispatch("gowordforward");
	}

	function wordBackwards(letter_obj) {
		console.log("word backwards");
		letterReset(letter_obj);
		dispatch("gowordbackwards");
	}

</script>


<!-- Markup --> 
<span>
	{#each letter_objects as letter_obj}
		<Letter 
			letter={letter_obj.letter} 
			is_curr_letter={letter_obj.is_curr_letter}
			is_correct={letter_obj.is_correct}
			is_appended={letter_obj.is_appended}
			is_last_letter={letter_obj.is_last_letter} /> 
	{/each}
</span>


<!-- Styles --> 
<style>
	span {
		font-size: 2rem;
		display: inline-block;
		padding-right: 1rem;
		padding-bottom: 1rem;
	}
</style>
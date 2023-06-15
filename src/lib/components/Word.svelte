<!-- Script -->
<script>
	import Letter from '$lib/components/Letter.svelte';

	// The actual word string
	export let word = undefined;

	// Bool for whether this word is the current word being typed
	export let is_curr_word = undefined;

	// Array of "letter" objects - main state for a word 
	//  {
	//		letter: str,
	//		is_curr_letter: bool,
	//		is_correct: bool
	//  }
	let letter_objects = [];

	// Index for what the current letter in the word
	let curr_letter_idx = 0;

	// Iterate through every letter of the word string
	for (let [idx, l] of [...word].entries()) {
		if (is_curr_word && curr_letter_idx == idx) {
			letter_objects.push({letter: l, is_curr_letter: true, is_correct: undefined });
		}
		else {
			letter_objects.push({letter: l, is_curr_letter: false, is_correct: undefined });
		}
	}

	export function onkeydown(key) {
		console.log(`Current Letter: ${JSON.stringify(letter_objects[curr_letter_idx])}`)
		console.log(`in Word: ${key}`);

		let current_letter_obj = letter_objects[curr_letter_idx];

		// 1. Correct letter was pressed
		if (key === current_letter_obj.letter) {
			console.log("ENTERED CORRECTLY");
			// Current letter
			current_letter_obj.is_correct = true;
			current_letter_obj.is_curr_letter = false;
			curr_letter_idx += 1;

			// New letter
			current_letter_obj = letter_objects[curr_letter_idx];
			current_letter_obj.is_curr_letter = true;
			letter_objects = letter_objects;
		}
	}
</script>


<!-- Markup --> 
<span>
	{#each letter_objects as letter_obj, idx}
		<Letter 
			letter={letter_obj.letter} 
			is_curr_letter={letter_obj.is_curr_letter}
			is_correct={letter_obj.is_correct} /> 
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
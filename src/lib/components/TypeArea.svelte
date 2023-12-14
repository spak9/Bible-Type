<!-- Script -->
<script>
	import Word from '$lib/components/Word.svelte';
    import { VerseState } from '$lib/constants/verse_state';
	import { TypeAreaStore } from '$lib/stores/TypeAreaStore';
	import { getModalStore } from '@skeletonlabs/skeleton';

	/**
	 * Props
	 */

	// verse text string user wants - replace new lines
	export let verse = "";
	verse = verse.replace(/(\r\n|\n|\r)/gm, "");

	/**
	 * Private State
	 */

	// Modal for bible verse query
	const modalStore = getModalStore();
	
	// Flag that's switched when user finishes/resets type area.
	let wpm = undefined;

	// times for calculating WPM
	let start_time = undefined;
	let end_time = undefined;

	// Array of "Word" components and word strings
	let words = verse.split(" ");
	let word_refs = [];

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
			start_time = new Date();
			console.log(`TIME HAS STARTED - ${start_time.toString()}`);
		}
		word_refs[curr_word_idx].onkeydown(e.key);
		console.log(`user pressed: ${e.key} - curr word index ${curr_word_idx}`);
	}

	// handler for custom "gowordback" "Word" events
	function ongowordbackwards() {
		if (curr_word_idx === 0) {
			// pass
		}
		else {
			curr_word_idx -= 1;
			word_refs[curr_word_idx].updateLastLetter();
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
		for (let word of word_refs) {
			let correct_num = word.isWordCorrect();
			// Get correct number of characters PLUS the implied "space"
			if (correct_num) {
				correctly_spelled_letters += (correct_num + 1)
			}
		}
		return Math.round(correctly_spelled_letters / 5 / minutes);
	}

	/**
	 * Updates the `TypeArea` by flipping the `TypeAreaStore` restart value
	 */
	function restartTypeArea() {
		$TypeAreaStore.restart = !$TypeAreaStore.restart
	}

	/**
	 * Pops up the Skeleton Modal to the user to search their bible verse.
	 * Asynchronously fetches verse and updates `TypeAreaStore`.
	 */
	function searchBibleVerse() {
		console.log($modalStore[0])
		const modalSettings = {
			type: 'prompt',
			title: 'Search For Bible Verse(s)',
			valueAttr: {
				placeholder: 'John 3:16-20'
			},
			response: async (verse) => {
				console.log(`User is querying for ${verse}`)

				// "Cancel" button case
				if (verse === false) {
					return
				}
				$TypeAreaStore.verse = VerseState.Loading
				try {
					const res = await fetch(`https://bible-api.com/${verse}`);
					const json = await res.json();

					// Handle the different possible cases from "bible-api" and fetching
					if (json.error) {
						$TypeAreaStore.verse = VerseState.APIError
					}

					else {
						$TypeAreaStore.verse = json.text
					}
				} catch (e) {
					$TypeAreaStore.verse = VerseState.JSError
				}
			}
		}
		modalStore.trigger(modalSettings)
	}
</script>


<!-- Markup -->
<svelte:window on:keydown={onkeydown}/>
<div>
	<!-- Game On -->
	{#if !wpm} 
		{#each words as word, idx}
			<Word
				on:gowordforward={ongowordforwards}
				on:gowordbackwards={ongowordbackwards}
				bind:this={word_refs[idx]}
				is_curr_word={idx === curr_word_idx ? true : false} 
				is_last_word={idx === (words.length - 1) ? true : false}
				{word}
			/>
		{/each}
	<!-- Game Off -->
	{:else}
		<h2>WPM: {wpm}</h2>
	{/if}
</div>

<!-- TypeArea Menu-->
<div class="flex justify-content items-center py-4">
	<button type="button" class="btn-icon text-primary-600" on:click={restartTypeArea}>
		<i class="fas fa-redo"></i>
	</button>
	<button type="button" class="btn-icon text-primary-600" on:click={searchBibleVerse}>
		<i class="fas fa-search"></i>
	</button>
</div>
 
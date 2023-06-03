<!-- Script -->
<script>
	import Word from '$lib/components/Word.svelte';

	// verse text string user wants
	export let verse = "";

	// reference to the current "Word" component
	let current_word = undefined;

	// times for calculating WPM
	let start_time = undefined;
	let end_time = undefined;

	let words = verse.split(" ");

</script>


<!-- Markup -->
<div>
	{#each words as word, idx}
		<Word word={word} />
	{/each} 
</div>

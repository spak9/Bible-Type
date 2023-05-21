<!-- Script -->
<script>
	import Word from '$lib/components/Word.svelte';

	// Verse/verses string user wants to type
	export let verses = "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.";

	// Private reference to the current "Word" component
	let current_word = undefined;

	let start_time = undefined;
	let end_time = undefined;

</script>


<!-- Markup -->
<div>
	{#each verses.split(" ") as word, idx}
		<Word word={word} />
	{/each} 
</div>

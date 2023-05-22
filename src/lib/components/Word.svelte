<!-- Script -->
<script>
	import Letter from '$lib/components/Letter.svelte';

	export let word = undefined;	// The actual word string
</script>


<!-- Markup --> 
<span>
	{#each word as letter}
		<Letter letter={letter} />
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
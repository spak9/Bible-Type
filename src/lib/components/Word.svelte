<!-- Script -->
<script>
	import Letter from '$lib/components/Letter.svelte';

	export let word = undefined;	// The actual word string
</script>


<!-- Markup --> 
<span>
	{word}
</span>


<!-- Styles --> 
<style>
	span {
		font-size: 2rem;
		display: inline-block;
		padding-right: 1rem;
	}
</style>
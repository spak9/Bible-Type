<!-- Script -->
<script>
	import TypeArea from '$lib/components/TypeArea.svelte';
	import TypeAreaMenu from '$lib/components/TypeAreaMenu.svelte';
	import Button, { Label } from "@smui/button";
	import { UIStore } from '$lib/stores/ui_store.js';

	export let data;

	let verse = data.verse;

	function onGetVerse(e) {
		console.log(`ongetverse: ${e.detail}`);
		verse = e.detail
	}
</script>


<!-- Markup -->
<div class="home-page">
	{#key verse}
		<TypeArea {verse}/>
	{/key}
	<TypeAreaMenu on:getverse={onGetVerse}/>
</div>


<!-- Styles --> 
<style>
	.home-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-self: center;

		/* 90% of the parent (~60%) */
		width: 90%;
		height: 100%;
	}
</style>

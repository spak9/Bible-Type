<!-- Script -->
<script>
	import TypeArea from '$lib/components/TypeArea.svelte';
	import TypeAreaMenu from '$lib/components/TypeAreaMenu.svelte';
	import Button, { Label } from "@smui/button";
</script>


<!-- Markup -->
<div class="home-page">
	<TypeArea/>
	<TypeAreaMenu/>
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

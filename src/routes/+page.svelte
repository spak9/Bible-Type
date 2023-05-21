<!-- Script -->
<script>
	import TypeArea from '$lib/components/TypeArea.svelte';
	import Button, { Label } from "@smui/button";
</script>


<!-- Markup -->
<div class="home-page">
	<TypeArea/>
	<div>
		<Button variant="raised">
		  <Label>Change Verse</Label>
		</Button>
	</div>
</div>


<!-- Styles --> 
<style>
	.home-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>

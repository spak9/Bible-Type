<script>
	import Button, { Label } from '@smui/button';
	let clicks = 0;
</script>

<h1>Bible Type</h1>

<Button color="secondary" class="blah" variant="raised" on:click={() => clicks++}>
	<Label>Clicks {clicks}</Label>
</Button>

<script>
	import Button, { Icon } from '@smui/button';
	let clicks = 0;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Button on:click={() => clicks++}>
	<Icon class="material-icons">favorite</Icon>Click Me {clicks}
</Button>

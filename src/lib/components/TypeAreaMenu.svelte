<!-- Script -->
<script>
	import { createEventDispatcher } from 'svelte';
	import IconButton from '@smui/icon-button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';

	// dispatch for custom event
	const dispatch = createEventDispatcher();

	// bool for modal opening
	let open = false;
	let verse = "John 3:16";

	async function getVerse(verse) {
		open = false;
		// Fetch new verse result
		const res = await fetch(`https://bible-api.com/${verse}`);
		const json = await res.json();
		let data = {verse_text: json.text}

		// Ensure `data` is not undefined
		if (data.verse_text === undefined || data.verse_text === "") {
			data.error_message = `"${verse}" was not found. Are you sure it's a valid verse?`;
		}
		
		// Emit "getverse" event
		console.log(`getverse: ${data.verse_text}`);
		dispatch("getverse", data);
	}
</script>


<!-- Markup -->
<div>
	<Dialog bind:open>
	  <Title>Search Bible Verse</Title>
	  <Content>
	  	<div>
	  		<Textfield bind:value={verse} noLabel={true}>
	  			<Icon 
	  				on:click={getVerse(verse)}
	  				class="material-icons" 
	  				role="button" 
	  				slot="trailingIcon">search</Icon>
	  		</Textfield>
	  	</div>
	  </Content>
	</Dialog>


	<IconButton 
		class="material-icons"
		on:click={() => open = true}>search</IconButton>
	<IconButton class="material-icons">restart_alt</IconButton>
</div>	


<!-- Styles --> 
<style>
	div {
		padding-top: 16px;
		padding-bottom: 16px;
	}
</style>
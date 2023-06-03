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
	//on:click={() => getVerseText(verse)} 

	async function getVerse(verse) {
		console.log(verse);
		// Fetch new verse result
		const res = await fetch(`https://bible-api.com/${verse}`);
		const json = await res.json();
		
		// Emit "getverse" event
		dispatch("getverse", json.text);
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
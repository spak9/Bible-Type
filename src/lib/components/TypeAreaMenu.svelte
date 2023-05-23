<!-- Script -->
<script>
	import IconButton from '@smui/icon-button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';

	let open = false;
	let verse = "John 3:16";

	async function getVerseText(verse) {
		console.log(verse);
		const res = await fetch(`https://bible-api.com/${verse}`);
		const json = await res.json();
		console.log(json.text);
		return json.text;
	}
</script>


<!-- Markup -->
<div>
	<!-- <Dialog bind:open_dialog>
		<Title id="b">Title</Title>
	</Dialog> -->
	<Dialog
	  bind:open
	  aria-labelledby="simple-title"
	  aria-describedby="simple-content">
	  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
	  <Title id="simple-title">Search Bible Verse</Title>
	  <Content id="simple-content">
	  	<div>
	  		<Textfield bind:value={verse} noLabel={true}>
	  			<Icon on:click={() => getVerseText(verse)} class="material-icons" role="button" slot="trailingIcon">search</Icon>
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
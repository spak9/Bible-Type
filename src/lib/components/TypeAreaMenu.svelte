<!-- Script -->
<script>
	import IconButton from '@smui/icon-button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';

	let open = false;
	let verse = "John 3:16";
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
	  		<Textfield bind:value={verse}>
	  			<Icon class="material-icons" role="button" slot="trailingIcon">search</Icon>
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
<!-- Script --> 
<script>
	// The actual letter in the form of a string
	export let letter = undefined;

	// Boolean for whether this letter is the currently typed one
	export let is_curr_letter = false;

	export let is_correct = undefined;
</script>


<!-- Markup -->
<span 
	class:correct-letter="{is_correct === true}"
	class:incorrect-letter="{is_correct === false}"
	class:curr-letter={is_curr_letter} >
	{letter}
</span>
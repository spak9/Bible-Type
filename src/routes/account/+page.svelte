<script>
    console.log("+page.svelte at /account");

    export let data;
    export let form;
</script>


<form action="?/register" method="POST" class="account-form">
    <h2>Register</h2>
    <input type="email" name="email" />
    <input type="password" name="password" />
    <input type="password" name="confirm-password" />
    <button type="submit">Register</button>
</form>
{#if form?.success} 
    <p>Data submitted: {form}</p>
{/if}


<style>
    .account-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%
    }
</style>
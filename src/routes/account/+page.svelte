<script>
    console.log("+page.svelte at /account");

    export let data;
    
    if (data.user) {
        console.log("/account - user exists!");
    }
</script>


{#if data.user}
    <h2>User is logged in</h2>
{:else}
    <form action="?/register" method="POST" class="account-form">
        <h2>Register</h2>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="password" name="confirm-password" />
        <button type="submit">Register</button>
    </form>
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
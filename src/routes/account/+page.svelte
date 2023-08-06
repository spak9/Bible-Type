<script>
    console.log("+page.svelte at /account");

    export let data;
</script>

{#if data.user}
    <h2>User is logged in</h2>
{:else}
    <div class="account-form-wrapper">
        <form action="?/register" method="POST" class="account-form">
            <h2>Register</h2>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="password" name="confirm-password" />
            <button type="submit">Register</button>
        </form>
        <form action="?/login" method="POST" class="account-form">
            <h2>Login</h2>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button type="submit">Login</button>
        </form>
    </div>

{/if}


<style>
    .account-form-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        height: 100%
    }
    .account-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>
<script>
    import Textfield from '@smui/textfield';

    console.log("+page.svelte at /account");

    export let data;

    let reg_username = "";
    let reg_password = "";
    let reg_confirm_password = "";

    let login_username = "";
    let login_password = "";

</script>

{#if data.user}
    <h2>User is logged in</h2>
{:else}
    <div class="account-form-wrapper">
        <!-- Wrap in HTML form for Svelte form actions -->
        <form action="?/register" method="POST" class="account-form">
            <h2>Register</h2>
            <div>
                <Textfield 
                required
                label="Username" 
                bind:value={reg_username}></Textfield>
            </div>
            <div>
                <Textfield 
                required
                label="Password" 
                bind:value={reg_password}></Textfield>
            </div>
            <div>
                <Textfield 
                required
                label="Confirm Password"
                bind:value={reg_confirm_password}></Textfield>
            </div>
            <button type="submit">Register</button>
        </form>
        
        <form action="?/login" method="POST" class="account-form">
            <h2>Login</h2>
            <div>
                <Textfield 
                required
                label="Username" 
                bind:value={login_username}></Textfield>
            </div>
            <div>
                <Textfield 
                required
                label="Password" 
                bind:value={login_password}></Textfield>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
{/if}


<style>
    .account-form-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
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
    form.account-form > div {
        margin: 16px;
    }

</style>
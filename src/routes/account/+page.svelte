<script>
    import Textfield from '@smui/textfield';
    import Button, { Label } from '@smui/button';

    console.log("+page.svelte at /account");

    // +page data
    export let data;

    // data from login/registration form actions
    // e.g error codes
    export let form;

    // Registration state
    let reg_username = "";
    let reg_email = "";
    let reg_password = "";
    let reg_confirm_password = "";

    // Login state
    let login_username = "";
    let login_password = "";

</script>


{#if form?.message}
    <h2>{form.message}</h2>
{/if}
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
                input$name="username"
                bind:value={reg_username}>
                </Textfield>
            </div>
            <div>
                <Textfield 
                required
                label="Email" 
                input$name="email"
                input$type="email"
                bind:value={reg_email}>
                </Textfield>
            </div>
            <div>
                <Textfield 
                required
                type="password"
                label="Password" 
                input$name="password"
                bind:value={reg_password}></Textfield>
            </div>
            <div>
                <Textfield 
                required
                type="password"
                label="Confirm Password"
                input$name="confirm-password"
                bind:value={reg_confirm_password}></Textfield>
            </div>
            <Button type="submit">
                <Label>Register</Label>
            </Button>
        </form>
        
        <form action="?/login" method="POST" class="account-form">
            <h2>Login</h2>
            <div>
                <Textfield 
                required
                label="Email"
                input$name="email"
                bind:value={login_username}></Textfield>
            </div>
            <div>
                <Textfield 
                required
                type="password"
                label="Password" 
                input$name="password"
                bind:value={login_password}></Textfield>
            </div>
            <Button type="submit">
                <Label>Login</Label>
            </Button>
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
<script>
  console.log("+page.svelte /account");

  // +page data
  export let data;

  // data from login/registration form action (e.g errors)
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


<!-- Markup -->
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
        <input class="my-2 px-2 py-2 input variant-form-material" name="username" placeholder="Username" required />
        <input class="my-2 px-2 py-2 input variant-form-material" name="email" type="email" placeholder="Email" required />
        <input class="my-2 px-2 py-2 input variant-form-material" name="password" type="password" placeholder="Password" required />
        <input class="my-2 px-2 py-2 input variant-form-material" name="confirm_password" type="password" placeholder="Confirm Password" required />
        <button class="rounded-lg p-2 my-2 variant-filled-secondary" type="submit">Register</button>
    </form>
    
    <form action="?/login" method="POST" class="account-form">
        <h2>Login</h2>
        <input class="my-2 px-2 py-2 input variant-form-material" type="email" name="email" placeholder="Email" required />
        <input class="my-2 px-2 py-2 input variant-form-material" name="password" type="password" placeholder="Password" required />
        <button class="rounded-lg p-2 my-2 variant-filled-secondary" type="submit">Log in</button>
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


import { fail, redirect } from '@sveltejs/kit';

export function load({ request }) {
  console.log(`+page.server.js at ${request.url}`)
}

/** @type {import('./$types').Actions} */
export const actions = {
  register: async (event) => {

    // Grab PocketBase instance
    const pb = event.locals.pb;

    // Grab form data from registration
    const form_data = await event.request.formData();
    const username = form_data.get("username");
    const email = form_data.get('email');
    const password = form_data.get('password');
    const confirm_password = form_data.get('confirm_password');

    // 
    // Server-side validation
    //

    // 1. Check if everything was passed in
    if (!(username && email && password && confirm_password)) {
        return fail(400, { message: 'Please fill out all of the required fields'})
    }

    // 2. Check if passwords are the same
    if (password !== confirm_password) {
      console.log('[+] passwords were not the same');
      return fail(400, { message: 'Passwords were not the same'})
    }

    // Create a brand-new user Record -
    // User creation will check whether `username` and `email` is unique
    try {
      let record = await pb.collection('users').create({
          username: username,
          email: email,
          password: password,
          passwordConfirm: confirm_password
      });
      console.log(`record - ${record}`)
    
    } catch (e) {
      console.log(`[+] - ${JSON.stringify(e.data.data)}`)
      return fail(400, {message : e.data.data.username.message})
    }

    // If user record is successfully created, authenticate the user and update store
    await pb.collection('users').authWithPassword(email, password);

    // Redirect to same route, now with authstore updated
    throw redirect(303, event.route.id);
  },
  login: async (event) => {

    // Grab PocketBase instance
    const pb = event.locals.pb;

    // Grab form data from login
    const form_data = await event.request.formData();
    const email = form_data.get('email')
    const password = form_data.get('password');

    // Log user in
    const auth_data = await pb.collection('users').authWithPassword(email, password);
    console.log(auth_data)

    // Redirect to same route, now with authstore updated
    throw redirect(303, event.route.id);
  },
  logout: async (event) => {
    event.locals.pb.authStore.clear();

    // Log the user out and redirect to "/account" for login form
    throw redirect(303, '/account');
  }
}
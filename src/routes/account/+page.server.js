import { redirect } from '@sveltejs/kit';

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
        const email = form_data.get('email');
        const password = form_data.get('password');
        const confirm_password = form_data.get('confirm-password');

        // Create a brand-new user Record
        await pb.collection('users').create({
            email: email,
            password: password,
            passwordConfirm: confirm_password
        });

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
        await pb.collection('users').authWithPassword(email, password);

        // Redirect to same route, now with authstore updated
        throw redirect(303, event.route.id);
    }
}
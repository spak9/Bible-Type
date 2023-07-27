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

        // Create a brand-new user
        const record = await pb.collection('users').create({
            email: email,
            password: password,
            passwordConfirm: confirm_password
        });

        console.log(`RESPONSE: ${record}`)

        return {success: true};
    }
}
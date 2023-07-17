export function load({ request }) {
    console.log(`+page.server.js at ${request.url}`)
}

/** @type {import('./$types').Actions} */
export const actions = {
    register: async ({ cookies, request }) => {
        const form_data = await request.formData();
        const email = form_data.get('email');
        const password = form_data.get('password');

        console.log(`email: ${email}; password: ${password}`);

        return {success: true};
    }
}
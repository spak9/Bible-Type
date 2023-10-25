import { redirect } from "@sveltejs/kit";


/**
 * POST request for logging users out
 */
export function POST( {locals }) {
    locals.pb.authStore.clear();
    console.log("+server.js at /logout - logging user out and redirecting to /account");

    // Log the user out and redirect to "/account" for login form
    throw redirect(303, '/account');
}
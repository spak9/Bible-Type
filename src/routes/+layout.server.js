export function load( {locals }) {
    if (locals.user) {
        console.log("+layout.server.js - User exists!");
        return {
            user: locals.user
        };
    }
    else {
        console.log("+layout.server.js - User does NOT exist!");
        return {
            user: undefined
        };
    }
}
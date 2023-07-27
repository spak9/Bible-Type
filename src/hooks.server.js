import PocketBase from 'pocketbase'


export async function handle({ event, resolve }) {
    console.log(`Incoming request from ${event.url.pathname}`)
    
    // Add PocketBase instance to "locals" kv store
    event.locals.pb = new PocketBase("http://127.0.0.1:8090");

    // Load/Feed into user's cookie
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get("pb_auth") || "");

    // If user is logged-in, update a shortcut path to user data
    if (event.locals.pb.authStore.isValid) {
        event.locals.user = event.locals.pb.authStore.model;
        console.log(`User is logged-in: ${event.locals.user}`);
    }

    // Retrieve HTTP Response
    const res = await resolve(event);

    // Update HTTP Response with some cookies - 
    // Setting "pb_auth" cookie
    res.headers.append("set-cookie", event.locals.pb.authStore.exportToCookie({secure: false}))

    return res;
}
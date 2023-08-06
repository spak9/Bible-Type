import PocketBase from 'pocketbase'
import { serializeNonPOJOs } from '$lib/utils';


export async function handle({ event, resolve }) {
    console.log(`+hooks.server.js - Incoming request from ${event.url.pathname}`)
    
    // Add PocketBase instance to "locals" kv store
    event.locals.pb = new PocketBase("http://127.0.0.1:8090");

    // Load/Feed into user's cookie
    const cookie = event.request.headers.get("cookie") || "";
    event.locals.pb.authStore.loadFromCookie(cookie);

    // 1. User is logged IN
    if (event.locals.pb.authStore.isValid) {
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
        console.log(`+hooks.server.js - AuthStore is valid - ${event.locals.user}`);
    }
    // 2. User is logged OUT
    else {
        event.locals.user = undefined;
    }

    // Retrieve HTTP Response
    const res = await resolve(event);

    // Update HTTP Response with some cookies - 
    // Setting "pb_auth" cookie
    res.headers.append("set-cookie", event.locals.pb.authStore.exportToCookie())

    return res;
}
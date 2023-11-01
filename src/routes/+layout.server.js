// @ts-nocheck

/**
 * Top-level load() for every single page. Will ensure that the
 * "User" model from PocketBase is returned to each respective page if logged in.
 */
export function load( {locals }) {
  console.log("+layout.server.js load()")
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
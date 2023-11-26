import { writable } from 'svelte/store';

/**
 * Writable Svelte store for checking status of the TypeArea component, which is keyed.
 * - restart: a boolean that triggers a refresh on {#key} TypeArea, just need to flip
 */
export const TypeAreaStore = writable({
  restart: false
}, () => {
  console.log("First subscriber on TypeAreaStore")
  return () => console.log("No more subscribers on TypeAreaStore")
});
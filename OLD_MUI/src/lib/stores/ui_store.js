import { writable } from "svelte/store";

export const UIStore = writable({
	verse: "John 3:16"
});
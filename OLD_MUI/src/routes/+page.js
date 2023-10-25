
export async function load({ fetch }) {

	// 1. Get user's prefs and get verse (or perhaps we just use a daily verse API)
	const verse = "john 3:16";
	const res = await fetch(`https://bible-api.com/${verse}`);
	const json = await res.json();
	return {
		verse: json.text
	};
}

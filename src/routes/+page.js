export async function load({ fetch }) {
  // 1. Get user's prefs and get verse
  // TODO: Use daily verse perhaps?
  console.log("+page.js load()")
  let verseText = "For God so loved the world"
  try {
    const verse = "john 3:16";
    const res = await fetch(`https://bible-api.com/${verse}`);
    const json = await res.json();
    verseText = json.text
  } catch (e) {
    console.log(e)
  }
  
  return {
    verse: verseText
  }
}

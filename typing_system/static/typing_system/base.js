let type_area = document.querySelector(".type-area");
let verse = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";
let verse_words = [];
let words = [];
let x = 0;

/*
    tokenize a given verse based on " ", that is
    spaces, resulting into array of words
*/
function tokenizeVerse() {
    let word_array = verse.split(" ").forEach(function(elem) {
        // our span
        let word = document.createElement("span");
        // span's text = elem
        word.innerHTML = elem;
        word.classList.add("word")
        type_area.appendChild(word);
        words.push(word);
        });
}

/*
    Tokenize a given list of words based on "", that is
    by the character, resulting in a mapping of
    <span> <--> characters
*/
function tokenizeWords(i) {
    let word_text = words[i].textContent; // string
    word_text.split("").forEach(function(elem) {
        // span for letter
        let letter = document.createElement("span");
        letter.innerHTML = elem;
        words[i].appendChild(letter);
    });
}

verse.split(" ").forEach(function(elem) {
    verse_words.push(elem);
})

tokenizeVerse();
let i;
for (i = 0; i < words.length; i++) {
    tokenizeWords(i);
    words[i].innerHTML = "";
}
// alert(words[0].textContent.length);
// let letter_span = document.createElement("span");
// letter_span.innerHTML = words[0].textContent[0]; // [f]or
// let letter_span2 = document.createElement("span");
// letter_span2.innerHTML = words[0].textContent[1]; // [f]or
// words[0].appendChild(letter_span);
// words[0].appendChild(letter_span2);

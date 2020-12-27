let type_area = document.querySelector(".type-area");
let verse = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";
let verse_words = []; // array of string; the 'verse' tokenized
let words = []; // array of HTML Span objects
let x = 0;

/*
    tokenize a given verse based on " ", that is
    spaces, resulting into array of words
*/
function tokenizeVerse() {
    verse.split(" ").forEach(function(elem) {
        // our span
        let word = document.createElement("span");
        // span's text = elem
        // word.innerHTML = elem;
        word.classList.add("word")
        type_area.appendChild(word);

        // append to their respective lists
        words.push(word);
        verse_words.push(elem);
        });
}

/*
    Tokenize a given list of words based on "", that is
    by the character, resulting in a mapping of
    <span> <--> characters
*/
function tokenizeWords(i) {
    let word_text = verse_words[i]; // string
    word_text.split("").forEach(function(elem) {
        // span for letter
        let letter = document.createElement("span");
        letter.classList.add("letter")
        letter.innerHTML = elem;
        words[i].appendChild(letter);
    });
}

tokenizeVerse();
let i;
for (i = 0; i < words.length; i++) {
    tokenizeWords(i);
}
// alert(words[0].textContent.length);
// let letter_span = document.createElement("span");
// letter_span.innerHTML = words[0].textContent[0]; // [f]or
// let letter_span2 = document.createElement("span");
// letter_span2.innerHTML = words[0].textContent[1]; // [f]or
// words[0].appendChild(letter_span);
// words[0].appendChild(letter_span2);

$(document).ready(function() {
    let i = 0;
    let j = 0;
    // length of the word; Ex: 'For' = 3
    let len = words[i].childElementCount;
    // the word in terms of its children;
    // Ex: <span .word> = [3 <span .letter]
    let arrayOfLetters = words[i].children;

    // Upon a user's keypress
    $(document).keypress(function(e) {
        let c = String.fromCharCode(e.which);
        if (c === arrayOfLetters[j].innerText) {
            arrayOfLetters[j].classList.add("correct-letter");
        }
        else {
            arrayOfLetters[j].classList.add("incorrect-letter");
        }
        j++;
    })
});

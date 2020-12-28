let type_area = document.querySelector(".type-area");
let verse = "For.!/123)9 God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";
let verse_words = []; // array of string; the 'verse' tokenized
let words = []; // array of HTML Span objects
let cursor = document.getElementById("cursor"); // the text cursor
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

$(document).ready(function() {
    // index for the array of words
    let i = 0;
    // index for letters within a word
    let j = 0;

    // length of the i-th word
    // Ex: 'For' = 3
    let len = words[i].childElementCount;

    // the word in terms of its children aka. the letters;
    // Ex: <span .word> = [3 <span .letter]
    let arrayOfLetters = words[i].children;

    // make the 1st letter of 1st word the current letter
    arrayOfLetters[j].classList.add("curr-letter");

    /*
        The main functionality, the handler to a keydown.
    */
    $(document).keydown(function(e) {
        // if 'Shift' key is used, then it must be used in
        // combination and will come in sequence;
        // 'Shift + a'. We want to ignore the 'Shift' key
        if (e.shiftKey) {
            // if 'Shift', just ignore
            if (e.key === "Shift") return;
        }
        // The 2nd sequential key, or 1st without 'Shift'

        // case 1. correct input
        if (e.key === arrayOfLetters[j].innerHTML) {
            // edge case for iterating to the next word
            if ((words[i].childElementCount - 1) === j) {
                arrayOfLetters[j].classList.add("correct-letter");
                arrayOfLetters[j].classList.remove("curr-letter");
                // update the word
                i++;
                j = 0;
                arrayOfLetters = words[i].children;
                arrayOfLetters[j].classList.add("curr-letter");
                return;
            }
            arrayOfLetters[j].classList.add("correct-letter");
            arrayOfLetters[j].classList.remove("curr-letter");
            j++;
            arrayOfLetters[j].classList.add("curr-letter");
        }
        // case 2. backspace
        else if (e.key === "Backspace") {
            // edge case when 1st letter is curr-letter, then
            // then go back to the previous word if possible
            if (j === 0) {
                // go back to prior word
                if (i > 0) {
                    arrayOfLetters[j].classList.remove("curr-letter");
                    i--;
                    j = words[i].childElementCount - 1;
                    arrayOfLetters = words[i].children;
                    arrayOfLetters[j].classList.remove("correct-letter");
                    arrayOfLetters[j].classList.add("curr-letter");
                    return;
                }
                else return;
            }
            arrayOfLetters[j].classList.remove("curr-letter");
            arrayOfLetters[j].classList = "";
            j--;
            arrayOfLetters[j].classList = "";
            arrayOfLetters[j].classList.add("curr-letter");
        }
        // case 3. incorrect case
        else {
            // edge case for iterating to the next word
            if ((words[i].childElementCount - 1) === j) {
                arrayOfLetters[j].classList.add("incorrect-letter");
                arrayOfLetters[j].classList.remove("curr-letter");
                // update the word
                i++;
                j = 0;
                arrayOfLetters = words[i].children;
                arrayOfLetters[j].classList.add("curr-letter");
                return;
            }
            arrayOfLetters[j].classList.add("incorrect-letter");
            arrayOfLetters[j].classList.remove("curr-letter");
            j++;
            arrayOfLetters[j].classList.add("curr-letter");
        }

    });
});

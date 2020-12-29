let type_area = document.querySelector(".type-area");
let verse = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";
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

        // case 3. space; iterate to next word
        if (e.key === " ") {
            // special cases: when curr-letter-right is on.
            // j will always be 1 ahead of last usable letter
            if (j >= verse_words[i].length) {
                j--;
            }
            arrayOfLetters[j].classList.remove("curr-letter", "curr-letter-right");
            i++;
            j = 0;
            arrayOfLetters = words[i].children;
            arrayOfLetters[j].classList.add("curr-letter");
        }
        // case 2. backspace; go back to prior letter, if applicable
        else if (e.key === "Backspace") {
            // special cases for appended letters

            // for last letter
            if (j === verse_words[i].length) {
                j--;
                arrayOfLetters[j].classList = "";
                arrayOfLetters[j].classList.add("curr-letter");
                return;
            }
            // for appended letters
            else if (j > verse_words[i].length) {
                j--;
                arrayOfLetters[j].remove();
                arrayOfLetters[j-1].classList.add("curr-letter-right");
                return;
            }
            // for j == 0, don't disappear!
            else if (j === 0) return;
            arrayOfLetters[j].classList = "";
            j--;
            arrayOfLetters[j].classList = "";
            arrayOfLetters[j].classList.add("curr-letter");
            return;
        }

        // case 0. Need to append extra letters

        // User reaches end of word, that is
        // j >= words[i].length(), then move cursor to right-side
        else if (j >= verse_words[i].length) {
            // Common case: appending words
            arrayOfLetters[j-1].classList.remove("curr-letter-right");
            let letter = document.createElement("span");
            letter.classList.add("letter")
            letter.classList.add("curr-letter-right");
            letter.classList.add("extra-letter");
            letter.innerHTML = e.key;
            words[i].appendChild(letter);
            j++;
            return;

        }

        // case 1. correct input
        else if (e.key === arrayOfLetters[j].innerHTML) {
            arrayOfLetters[j].classList.add("correct-letter");
            arrayOfLetters[j].classList.remove("curr-letter");
            j++;
            // ONLY FOR LAST LETTER, not appending
            if (j >= verse_words[i].length) {
                // Uncommon case: user reaches the end of the word
                arrayOfLetters[j-1].classList.add("curr-letter-right");
                return;
            }
            arrayOfLetters[j].classList.add("curr-letter");

        }
        // case 4. incorrect case
        else {
            arrayOfLetters[j].classList.add("incorrect-letter");
            arrayOfLetters[j].classList.remove("curr-letter");
            j++;
            // ONLY FOR LAST LETTER, not appending
            if (j >= verse_words[i].length) {
                // Uncommon case: user reaches the end of the word
                arrayOfLetters[j-1].classList.add("curr-letter-right");
                return;
            }
            arrayOfLetters[j].classList.add("curr-letter");
        }

    });
});

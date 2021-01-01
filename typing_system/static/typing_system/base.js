/*
    Global variables
*/
let type_area = document.querySelector(".type-area");
let verse = "For God so";
//let verse = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";
let verse_words = []; // array of string; the 'verse' tokenized
let words = []; // array of HTML Span objects
let cursor = document.getElementById("cursor"); // the text cursor
let i, j; // indices
let start_time, end_time; // Date objects for getting the wpm

/*

*/
tokenizeVerse();
for (i = 0; i < words.length; i++) {
    tokenizeWords(i);
}


$(document).ready(function() {
    // index for the array of words
    i = 0;
    // index for letters within a word
    j = 0;

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
        // start the timer from the 1st press
        if (start_time === undefined) start_time = new Date().getTime();
        // Ignore special/modifier keys
        if (e.key === "Shift" ||
            e.key === "Alt" ||
            e.key === "Control" ||
            e.key === "Meta" ||
            e.key === "CapsLock" ||
            e.key === "Tab") return;

        // case 1. space; iterate to next word
        if (e.key === " ") {
            // end the game if user is on the last word
            if (i === words.length - 1) {
                end_time = new Date().getTime();
                getWPM();
                return;
            }
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
            else if (j === 0) {
                return;
            }
            arrayOfLetters[j].classList = "";
            j--;
            arrayOfLetters[j].classList = "";
            arrayOfLetters[j].classList.add("curr-letter");
            return;
        }

        // case 3. Need to append extra letters

        // User reaches end of word, that is
        // j >= words[i].length(), then move cursor to 'right-side'
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

        // case 4. correct input
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
        // case 5. incorrect case
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

/*
    Get the difference between end & start times
    for calculating wpm

    - From `MonkeyType`,
    "wpm - total amount of characters in the correctly typed words
    (including spaces), divided by 5 and normalised to 60 seconds."
    - wpm = [(characters in correct words) / 5 * 60 secs] / total seconds
*/
function getWPM() {
    let i, j;
    // loop through all the word spans, and if they're "correct"
    // words, that is, all letter spans are correct, then
    // add it to correct characters
    let correct_letters = 0;
    let total = 0;
    let arrayOfLetters;
    for (i = 0; i < words.length; i++) {
        // let correct_letters = 0;
        arrayOfLetters = words[i].children;
        for (j = 0; j < arrayOfLetters.length; j++) {
            if (arrayOfLetters.length > verse_words[i].length) break;
            if (arrayOfLetters[j].classList.contains("correct-letter")) {
                correct_letters++;
            }
        }
        if (correct_letters === verse_words[i].length &&
            arrayOfLetters.length === verse_words[i].length) {
            total = total + verse_words[i].length;
        }
        correct_letters = 0;
    }
    let total_time = (end_time - start_time) * 1.0 / 1000;
    alert("correct letters: " + correct_letters);
    alert(total);
    let wpm = (((total / 5)/total_time) * 60);
    alert("total time: " + total_time + "wpm: " + wpm);

}

/*
    Global variables
*/
let type_area = document.querySelector(".type-area");
let input = document.querySelector("#verse-input");
//let verse = "For God";
let verse = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";
let verse_words = []; // array of string; the 'verse' tokenized
let words = []; // array of HTML Span objects
let cursor = document.getElementById("cursor"); // the text cursor
let i, j; // indices
let start_time, end_time; // Date objects for getting the wpm
let wpm; // wpm for user
let arrayOfLetters;

type_area.innerHTML = "";
words = [];
verse_words = [];
tokenizeVerse();
for (i = 0; i < words.length; i++) {
    tokenizeWords(i);
}
// index for the array of words
i = 0;
// index for letters within a word
j = 0;

// the word in terms of its children aka. the letters;
// Ex: <span .word> = [3 <span .letter]
arrayOfLetters = words[i].children;

// make the 1st letter of 1st word the current letter
arrayOfLetters[j].classList.add("curr-letter");
// make it undefined and start on keydowns
start_time = undefined;
wpm = undefined;


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
    - i is the index for the word
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
    let i;
    // loop through all the word spans, and if they're "correct"
    // words, that is, all letter spans are correct, then
    // add it to correct characters
    let correct_letters = 0;
    let total = 0;
    let arrayOfLetters;
    for (i = 0; i < words.length; i++) {
        total = total + isCorrect(i);
    }
    let total_time = (end_time - start_time) * 1.0 / 1000;
    // precision to 1 decimal point
    return (((total / 5)/total_time) * 60).toFixed(1);
    // alert("total time: " + total_time + "wpm: " + wpm);
}

/*
    returns the correct letters within a word, that is, every
    letter must be correct within a word for it to be considered correct
    - i is the index for the 'words' array
*/
function isCorrect(i) {
    // shadow of global variable
    let arrayOfLetters = words[i].children;
    let j;
    let correct_letters = 0;
    // iterate through a "word" and check whether the word is correct
    for (j = 0; j < arrayOfLetters.length; j++) {
        if (arrayOfLetters[j].classList.contains("correct-letter")) {
            correct_letters++;
        }
    }
    // make sure there are no appended letters
    if (correct_letters === arrayOfLetters.length) return correct_letters;
    return 0;
}

/*
    Calls getWPM() and displays the results to the user,
    whilst hiding the `typing-area`
*/
function displayResults() {
    end_time = new Date().getTime();
    wpm = getWPM();
    // display to user by "restarting" type-area
    type_area.classList.add("type-area-fadeOut");
    type_area.innerHTML = "";
    if (wpm > 100) {
        type_area.innerHTML = "wpm: " + wpm + " - Nice! You write faster than Apostle Paul! - wpm: ";
    }
    else {
        type_area.innerHTML = "wpm: " + wpm + " - Don't worry! Once you practice a little more, you'll be writing faster than Apostle Paul!";
    }
}

/*
    AJAX callback function for sending http request to bible-api
*/
function getVerse() {
    // first, get the string from the input box
    let verse_str = document.getElementById("verse-input");
    let url = "https://bible-api.com/" + verse_str.value;

    // second, create request & open() + send()
    let httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        alert("Can't send request for some reason...");
        return false;
    }
    // Handler for getVerse response
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let response = JSON.parse(httpRequest.responseText);
                // update our verse and restart the game
                verse = response["text"];
                // replace all occurances of white spaces
                verse = verse.replace("\n", "");
            }
            // status code is messed up
            else {
                verse = "Something's wrong with the query :( Check the bible verse formatting!"
            }
            restartGame();
        }
    }

    // send request with 'url'
    httpRequest.open('GET', url, true);
    httpRequest.send();
}

/*
    Restart the game by restarting the type area
    and make start_time undefined so that we
    can get a new wpm
*/
function restartGame() {
    let restart_btn = document.getElementById("click").blur();
    type_area.innerHTML = "";
    type_area.classList.remove("type-area-fadeOut");
    input.blur();
    words = [];
    verse_words = [];
    tokenizeVerse();
    for (i = 0; i < words.length; i++) {
        tokenizeWords(i);
    }
    // index for the array of words
    i = 0;
    // index for letters within a word
    j = 0;

    // the word in terms of its children aka. the letters;
    // Ex: <span .word> = [3 <span .letter]
    arrayOfLetters = words[i].children;

    // make the 1st letter of 1st word the current letter
    arrayOfLetters[j].classList.add("curr-letter");
    // make it undefined and start on keydowns
    start_time = undefined;
    wpm = undefined;
}

$(document).ready(function() {
    $("#verse-input").keydown(function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            getVerse();
        }
    })
    /*
        The main functionality, the handler to a keydown for general typing.
    */
    $(document).keydown(function(e) {
        // Firstly, ignore input in search bar
        if (document.activeElement === input) return;

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
            if (i === words.length - 1 && wpm === undefined) {
                displayResults();
                return;
            }
            else if (wpm !== undefined) return;
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
            // for j == 0, need to go back to the prior word
            // if appropriate of course..
            else if (j === 0) {
                // if backspace on first word, don't disappear!
                if (i === 0) return;
                else {
                    // don't go back on correct word
                    if (isCorrect(i-1) > 0) {
                        return;
                    }
                    // go back to the previous word, putting the
                    // cursor at "curr-letter-right"
                    else {
                        arrayOfLetters[j].classList = "";
                        i--;
                        // j = verse_words[i].length;
                        arrayOfLetters = words[i].children;
                        j = arrayOfLetters.length;
                        arrayOfLetters[j-1].classList.add("curr-letter-right");
                        return;
                    }
                }
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
                // last letter of last word will cause end-game for user
                if (i === verse_words.length-1 && j === verse_words[i].length) {
                    if (isCorrect(i) > 0) {

                        displayResults();
                        return;
                    }
                }
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
            return;
        }
    });
});

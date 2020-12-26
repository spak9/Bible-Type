let type_area = document.querySelector(".type-area");
let verse = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.";
let words = [];

/*
    tokenize a given verse based on " ", that is
    spaces, resulting into array of words
*/
function tokenizeVerse() {
    let word_array = verse.split(" ").forEach(function(elem) {
        // our span
        const word = document.createElement("span");
        const text = document.createTextNode(elem);
        word.appendChild(text);
        type_area.appendChild(word);
        });
}

//

tokenizeVerse();

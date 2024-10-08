/**
This function generates a random word
 */


const path = require("path");
const fs = require('fs');
var dictionary = fs.readFileSync(path.join(process.cwd(), 'dictionary.json'), {
    encoding: 'utf8',
    flag: 'r'
})
var dict = JSON.parse(dictionary)
var dictLength = Object.entries(dict).length
console.log("file ready?")
export function GET(request) {
   var word = {
        word: undefined,
        def: undefined
    };
    var i = 0;
    var wordIndex = 0;
    // skip over words that don't have a definition atached
    while (
        (word.word == undefined ||
            word.def == undefined) &&
        i < 100
    ) {
        wordIndex = Math.round(Math.random() * dictLength);
        var dictKey = Object.keys(dict)[wordIndex];
        word = {
            word: dictKey,
            def: Object.values(dict)[wordIndex],
            index: wordIndex
        }
        i++
    }
console.log(word)
    return new Response(JSON.stringify(word));

}

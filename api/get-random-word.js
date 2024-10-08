/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */


const path = require("path");
const fs = require('fs');
var dictionary = fs.readFileSync(path.join(process.cwd(), 'dictionary.json'), {
    encoding: 'utf8',
    flag: 'r'
})

console.log("file ready?")
export function GET(request) {
    /*var word = {
        word: undefined,
        def: undefined
    };
    var i = 0;
    var wordIndex = 0;
    console.log(dictionary)
    // skip over words that don't have a definition atached
    while (
        (word.word == undefined ||
            word.def.MEANINGS["1"] == undefined) &&
        i < 100
    ) {
        wordIndex = Math.round(Math.random() * Object.keys(dictionary).length);
        var dictKey = Object.keys(dictionary)[wordIndex];
        word = {
            word: dictKey,
            def: Object.values(dictionary)[wordIndex],
            index: wordIndex
        }
        i++
    }
console.log(word)*/
    return new Response(dictionary);

}

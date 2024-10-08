// This function takes a index and returns the word and def at that index
const path = require("path");
const fs = require('fs');
var dictionary = fs.readFileSync(path.join(process.cwd(), 'dictionary.json'), {
    encoding: 'utf8',
    flag: 'r'
})
var dict = JSON.parse(dictionary)
console.log("file ready?")
export function GET(request) {
    //const { body } = request;
    console.log(request)
   var word = {
        word: Object.keys(dict)[100],
        def: Object.values(dict)[100]

    }
    return new Response(word);
}

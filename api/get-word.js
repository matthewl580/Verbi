// This function takes a index and returns the word and def at that index
const path = require("path");
const fs = require('fs');
var dictionary = fs.readFileSync(path.join(process.cwd(), 'dictionary.json'), {
    encoding: 'utf8',
    flag: 'r'
})
var dict = JSON.parse(dictionary)
console.log("file ready?")
export default async function handler(req, res) {
    const { body } = req;
    var wordIndex =  body.index;
    word = {
        word: Object.keys(dict)[wordIndex],
        def: Object.values(dict)[wordIndex]

    }
    return res.send(word);
}

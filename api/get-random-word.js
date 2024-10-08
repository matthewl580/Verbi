/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */


const path = require("path");
const fs = require('fs');

export function GET(request) {
  let usersPath = path.join(process.cwd(), 'dictionary.json');
  let dictionary = fs.readFileSync(usersPath);
  var word = { word: undefined, def: undefined };
  let i = 0;
  // skip over words that don't have a definition atached
  while (
    word.word == undefined ||
    word.def.MEANINGS["1"] == undefined ||
    i < 100
  ) {
    let randomLetterNum = Math.round(Math.random() * 25);
    let defNum = Math.round(Math.random() * Object.keys(dictionary[letterNum]).length);
    word = { word: Object.keys(dictionary[randomLetterNum])[defNum],
    def: Object.values(dictionary[randomLetterNum])[defNum],
    letterNum: randomLetterNum,
    defNum:  defNum}
    i++
  }

  return new Response(word);
}

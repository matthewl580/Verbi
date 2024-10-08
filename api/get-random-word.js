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
  var i = 0;
var wordIndex = 0;
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
    index: wordIndex}
    i++
  }
console.log(2345)
  console.log(Object.keys(dictionary))
  console.log(3456543345432)
  console.log(Object.values(dictionary))
  return new Response(JSON.stringify(word));
}

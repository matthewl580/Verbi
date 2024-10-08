// This function takes a index and returns the word and def at that index
const path = require("path");
const fs = require('fs');
var dictionary = fs.readFileSync(path.join(process.cwd(), 'dictionary.json'), {
    encoding: 'utf8',
    flag: 'r'
})
var dict = JSON.parse(dictionary)
console.log("file ready?")
function isolateValue(urlString) {
    const url = new URL(urlString);
    const searchParams = url.searchParams;
    
    // Check if 'index' parameter exists
    if (searchParams.has('index')) {
      const value = searchParams.get('index');
      return value;
    } else {
      return 100;  // Or throw an error if 'index' is mandatory
    }
  }
export function GET(request) {
    //const { body } = request;
    var wordIndex = isolateValue(request.url)
   var word = {
        word: Object.keys(dict)[wordIndex],
        def: Object.values(dict)[wordIndex]

    }
    return new Response(JSON.stringify(word));
}

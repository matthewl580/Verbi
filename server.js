const fs = require("fs")
const path = require('path');
// IMPORTANT - Fastly
const fastify = require("fastify")({ logger: false });
fastify.register(require("@fastify/static"), { // Setup our static files
  root: path.join(__dirname, "public"),
  prefix: "/",
});
fastify.register(require("@fastify/formbody")); // Formbody lets us parse incoming forms
fastify.register(require("@fastify/view"), { // View is a templating manager for fastify
  engine: {
    handlebars: require("handlebars"), // handlebars = .hbs
  },
});


console.log(__dirname)

var dictionary = [];
var place = 3;
var WEB_URL_PATH = "https://verbi-six.vercel.app"
async function setUpDictionary() {
  // Import all the letters
  var i = 0;
  for (const letter of "abcdefghijklmnopqrstuvwxyz") {
        //await dictionary.push(readJSONFile(path.join(__dirname, "Data",`${letter}.json`)))
     console.log(i)
    i++
  }
  return dictionary;
}
function readJSONFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);   

      } else {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(parseError);   

        }
      }
    });
  });
}
function fetchWord(letterNum, defNum) {
  return {
    word: Object.keys(dictionary[letterNum])[defNum],
    def: Object.values(dictionary[letterNum])[defNum],
  };
}



function splitIntoSyllables(word) {
  word = word.toLowerCase(); // Convert to lowercase for consistency

  const vowels = "aeiouy";
  const vowelRegex = new RegExp(`[${vowels}]`, "g");

  let syllables = [];
  let currentSyllable = "";

  for (let i = 0; i < word.length; i++) {
    const char = word[i];

    // Single vowels at the beginning or end of a word:
    if (vowelRegex.test(char) && (i === 0 || i === word.length - 1)) {
      syllables.push(char);
      continue;
    }

    // Handle vowel combinations as single syllables:
    if (vowelRegex.test(char) && vowelRegex.test(word[i + 1])) {
      currentSyllable += char;

      // Check for trailing consonant after a vowel pair:
      if (i + 2 < word.length && !vowelRegex.test(word[i + 2])) {
        currentSyllable += word[i + 1];
        i++; // Skip the next vowel
      }

      continue;
    }

    // Handle consonant-vowel pairs:
    if (!vowelRegex.test(char) && vowelRegex.test(word[i + 1])) {
      if (currentSyllable) {
        syllables.push(currentSyllable);
        currentSyllable = "";
      }
      currentSyllable += char;
      continue;
    }

    currentSyllable += char;
  }
  return `${syllables.join("•")}${currentSyllable}`;
}

function selectNewWord() {
  var word = '';
  let i = 0;
  console.log(5)
  // skip over words that don't have a definition atached
  while (
    word == '' ||
    i < 100
  ) {
    let randomLetterNum = Math.round(Math.random() * 25);
    let defNum =  Math.round(Math.random() *Object.keys(dictionary[randomLetterNum]).length);
    word = fetchWord(randomLetterNum, defNum);
    word.letterNum = randomLetterNum;
    word.defNum = defNum;
    i++
  }
  return word;
}


fastify.get("/", function (request, reply) {return selectNewWord()})

// Run the server and report out to the logs
fastify.listen(
  { port:3000, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
setUpDictionary()

  }
);

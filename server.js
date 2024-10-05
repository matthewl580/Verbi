const path = require('path');
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});
// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

var dictionary = [];
var place = 3;
var WEB_URL_PATH = "https://verbi-git-main-matthewl580s-projects.vercel.app/"
setUpDictionary(true);
function setUpDictionary(callStartFunc = false) {
  // Import all the letters
  var i = 0;
  for (const letter of "abcdefghijklmnopqrstuvwxyz") {
    console.log(letter, "abcdefghijklmnopqrstuvwxyz".indexOf(letter));
    fetch(`${WEB_URL_PATH}Data/${letter}.json`)
      .then((response) => response.json())
      .then((data) => {
        // Access the imported data using the letter variable and add it to the dictionary
        dictionary["abcdefghijklmnopqrstuvwxyz".indexOf(letter)] = data;
        //console.log(dictionary[i])
        i++;
        if (i == 26 && callStartFunc == true) {
          start(dictionary);
        }
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }
  return dictionary;
}

function start(dict) {
  dictionary = dict;
  // set up the word array with an innitial 10 items
  for (let i = 0; i < 10; i++) {
  }
  // display the first word
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
  var word = { word: undefined, def: undefined };
  let i = 0;
  // skip over words that don't have a definition atached
  while (
    word.word == undefined ||
    word.def.MEANINGS["1"] == undefined ||
    i > 50
  ) {
    let randomLetterNum = Math.round(Math.random() * 25);
    let defNum = Math.round(Math.random() * Object.keys(dictionary[1]).length);
    word = fetchWord(randomLetterNum, defNum);
    word.letterNum = randomLetterNum;
    word.defNum = defNum;
  }
  return word;
  console.log(word);
}


fastify.get("/", function (request, reply) {return selectNewWord}

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);

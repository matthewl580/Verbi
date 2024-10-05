var dictionary = [];
var wordList = [];
var place = 3;

setUpDictionary(true);
function setUpDictionary(callStartFunc = false) {
  // Import all the letters
  var i = 0;
  for (const letter of "abcdefghijklmnopqrstuvwxyz") {
    console.log(letter, "abcdefghijklmnopqrstuvwxyz".indexOf(letter));
    fetch(`/Data/${letter}.json`)
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
    wordList.push(selectNewWord());
  }
  console.log(wordList);
  // display the first word
  displayWord(wordList[place]);
}
function fetchWord(letterNum, defNum) {
  return {
    word: Object.keys(dictionary[letterNum])[defNum],
    def: Object.values(dictionary[letterNum])[defNum],
  };
}
function displayWord(wordObject) {
  document.getElementById(
    "word"
  ).textContent = `${wordObject.word[0].toUpperCase()}${wordObject.word
    .slice(1)
    .toLowerCase()}`;
  document.getElementById("def").textContent = `${wordObject.def.MEANINGS[
    "1"
  ][1][0].toUpperCase()}${wordObject.def.MEANINGS["1"][1]
    .slice(1)
    .toLowerCase()}`;
  document.getElementById(
    "partOfSpeech"
  ).textContent = `(${wordObject.def.MEANINGS["1"][0]})`;
  document.getElementById("syllables").textContent = `[${splitIntoSyllables(
    wordObject.word
  )}]`;
}

function getNextWord(direction) {
  if (direction == "forward" || direction == "f") {
    if (place + 1 == wordList.length) {
      // if we're on the last word
      console.log("generating new word");
      wordList.push(selectNewWord());
      return wordList[wordList.length - 1];
    } else {
      return wordList[place + 1];
    }
  } else {
    // direction != "forward", go in the other direction
    console.log("going to a previous word");
    if (place - 1 == 0) {
      // THROW AN ERROR HERE =============================================================================>
      return wordList[0];
    } else {
      return wordList[place - 1];
    }
  }
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

// swipe functionalilty
function detectswipe(el, func) {
  var swipe_det = new Object();
  swipe_det.sX = 0;
  swipe_det.sY = 0;
  swipe_det.eX = 0;
  swipe_det.eY = 0;
  var min_x = 30; //min x swipe for horizontal swipe
  var max_x = 30; //max x difference for vertical swipe
  var min_y = 50; //min y swipe for vertical swipe
  var max_y = 60; //max y difference for horizontal swipe
  var direc = "";
  var ele = document.getElementById(el);
  ele.addEventListener(
    "touchstart",
    function (e) {
      var t = e.touches[0];
      swipe_det.sX = t.screenX;
      swipe_det.sY = t.screenY;
    },
    false
  );
  ele.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
      var t = e.touches[0];
      swipe_det.eX = t.screenX;
      swipe_det.eY = t.screenY;
    },
    false
  );
  ele.addEventListener(
    "touchend",
    function (e) {
      //horizontal detection
      if (
        (swipe_det.eX - min_x > swipe_det.sX ||
          swipe_det.eX + min_x < swipe_det.sX) &&
        swipe_det.eY < swipe_det.sY + max_y &&
        swipe_det.sY > swipe_det.eY - max_y &&
        swipe_det.eX > 0
      ) {
        if (swipe_det.eX > swipe_det.sX) direc = "r";
        else direc = "l";
      }
      //vertical detection
      else if (
        (swipe_det.eY - min_y > swipe_det.sY ||
          swipe_det.eY + min_y < swipe_det.sY) &&
        swipe_det.eX < swipe_det.sX + max_x &&
        swipe_det.sX > swipe_det.eX - max_x &&
        swipe_det.eY > 0
      ) {
        if (swipe_det.eY > swipe_det.sY) direc = "d";
        else direc = "u";
      }

      if (direc != "") {
        if (typeof func == "function") func(el, direc);
      }
      direc = "";
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
    },
    false
  );
}
// debug Function
function myfunction(el, d) {
  alert("you swiped on element with id '" + el + "' to " + d + " direction");
}
detectswipe("backgroundImage", selectAndDisplayWord);
function selectAndDisplayWord() {
  displayWord(getNextWord("f"));
  place++;
}
document.addEventListener("keyup", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    displayWord(getNextWord("f"));
    place++;
  }
  if (event.code === "ArrowDown") {
    displayWord(getNextWord("p"));
    place--;
  }
});

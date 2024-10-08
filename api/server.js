/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */


const path = require("path");
const fs = require('fs');

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


export function GET(request) {
   try {
    const data = await readFile('dictionary.json');
    return new Response(data)
  } catch (error) {
    console.error('Error reading file:', error);
     return new Response("error :(
  }
}

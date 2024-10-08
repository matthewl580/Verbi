/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");
const fs = require('fs');

export function GET(request) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(process.cwd(), 'dictionary.json'), "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          // Parse the JSON data into a JavaScript object

          // Return the parsed JSON object as a JSON response
          resolve(new Response((jsonData)));
        } catch (error) {
          // Handle parsing errors gracefully
          console.error("Error parsing: ", error);
          reject(error);
        }
      }
    });
  });
}

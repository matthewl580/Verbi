/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */


const path = require("path");
const fs = require('fs');

export function GET(request) {
  let usersPath = path.join(process.cwd(), 'dictionary.json');
  let file = fs.readFileSync(usersPath);
  return new Response(file);
}

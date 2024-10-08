/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");
var fs = require('fs');
var obj = fs.readFileSync('dictionary.json', 'utf8');

export function GET(request) {
  return new Response(obj);
}

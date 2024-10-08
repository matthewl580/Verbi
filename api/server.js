/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");
var fs = require('fs');
//var obj = fs.readFileSync(path.join(process.cwd(), 'dictionary.json'),'utf8');
/*
 let usersPath = path.join(process.cwd(), 'dictionary.json');
  let file = fs.readFileSync(usersPath);
*/
export function GET(request) {
 /* console.log(4);
  console.log(obj);
  return new Response(obj);*/
  new Promise((resolve, reject) => {
    fs.readFile(path.join(process.cwd(), 'dictionary.json'), "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
     console.log(65)
      console.log(data);
      resolve(data);
    });
  })then((data) => {new Response(data)}
 
}

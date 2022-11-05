const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('genres.csv')
 .pipe(csv({}))
 .on('data', (data) => results.push(data))
 .on('end', () => {
   console.log(results);
 });

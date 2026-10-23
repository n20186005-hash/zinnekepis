const fs = require('fs');
function ctx(file, word) {
  const s = fs.readFileSync(file, 'utf8');
  let i = s.indexOf(word), n = 0;
  while (i !== -1 && n < 3) {
    console.log('  [' + file + '] ...' + s.slice(Math.max(0, i - 55), i + word.length + 35).replace(/\n/g, ' ') + '...');
    i = s.indexOf(word, i + 1);
    n++;
  }
}
console.log('=== Bruxelles in en.json ==='); ctx('src/messages/en.json', 'Bruxelles');
console.log('=== Bruxelles in nl.json ==='); ctx('src/messages/nl.json', 'Bruxelles');
console.log('=== Bruxelles in fr.json (baseline) ==='); ctx('src/messages/fr.json', 'Bruxelles');
const h = fs.readFileSync('.next/server/app/en.html', 'utf8')
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<[^>]+>/g, ' ');
console.log('en home has "Free and open":', h.includes('Free and open'),
  '| "Brussels":', h.includes('Brussels'),
  '| "Bruxelles":', h.includes('Bruxelles'));

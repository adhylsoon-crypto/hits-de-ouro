const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'latin1');
c = c.replace(/Ã©/g,'é').replace(/Ã£/g,'ã').replace(/Ã§/g,'ç').replace(/Ãº/g,'ú').replace(/Ã¡/g,'á').replace(/Ã³/g,'ó').replace(/Ã /g,'à').replace(/Ãª/g,'ê').replace(/Ã¢/g,'â').replace(/ðŸ"¥/g,'🔥').replace(/ðŸŽµ/g,'🎵').replace(/ðŸ'/g,'👍').replace(/ðŸŸ¢/g,'🟢').replace(/ðŸ"µ/g,'🔵').replace(/ðŸŒ/g,'🌍').replace(/ðŸŽ¸/g,'🎸');
fs.writeFileSync('app/page.tsx', c, 'utf8');
console.log('CORRIGIDO');

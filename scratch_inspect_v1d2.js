const fs = require('fs');
const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reports = Array.isArray(data) ? data : (data.value || []);

const v1d2 = reports.find(r => r.id === 'veraval1_d2');
console.log('--- veraval1_d2 photos ---');
v1d2.photos.forEach((p, i) => {
  console.log(`[${i}] id=${p.id} url=${p.url} time=${p.time} gps=${p.gps}`);
});

const fs = require('fs');
const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reports = Array.isArray(data) ? data : (data.value || []);

let Rs = reports;
let P = Rs.flatMap(r => (r.photos || []).map(p => ({ ...p, r })));
console.log('Total P count:', P.length);

let displayed = P.slice(-48).reverse();
console.log('Displayed count:', displayed.length);
displayed.forEach((p, idx) => {
  console.log(`[${idx}] school: "${p.r.school}", reportId: "${p.r.id}", photoId: "${p.id}", url: "${(p.url||'').slice(0, 70)}"`);
});

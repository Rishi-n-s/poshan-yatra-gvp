const fs = require('fs');
const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reports = Array.isArray(data) ? data : (data.value || []);

console.log('=== CHECKING DUPLICATE PHOTOS WITHIN REPORTS ===');
reports.forEach(r => {
  const photos = r.photos || [];
  const seenUrls = new Map();
  photos.forEach((p, idx) => {
    const url = p.url || '';
    if (seenUrls.has(url)) {
      console.log(`Report [${r.id}] has DUPLICATE photo url at indices ${seenUrls.get(url)} and ${idx}: ${url}`);
    } else {
      seenUrls.set(url, idx);
    }
  });
});

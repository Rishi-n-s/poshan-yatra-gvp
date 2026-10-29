const fs = require('fs');

const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reports = Array.isArray(data) ? data : (data.value || []);

const rootFiles = fs.readFileSync('scratch_check_bucket.js', 'utf8'); // we know root had 78 files
// Let's get the exact list of 78 root files
const https = require('https');
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlc29leHF5bXFqc3psZHJqcmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NDYxNDksImV4cCI6MjEwODMyMjE0OX0.9bsJf5lLQgSIVd9TVtLouTXFHP9Bt_pDKlKUEoQAFj0';

const payload = JSON.stringify({ prefix: '', limit: 100 });
const req = https.request('https://gesoexqymqjszldrjrao.supabase.co/storage/v1/object/list/photos', {
  method: 'POST',
  headers: {
    'apikey': apikey,
    'Authorization': 'Bearer ' + apikey,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const list = JSON.parse(body);
    const existingRoot = new Set(list.map(x => x.name));

    console.log('--- REPORTS WITH MISSING PHOTOS ---');
    reports.forEach(r => {
      const photos = r.photos || [];
      const missing = photos.filter(p => {
        if (!p.url) return true;
        if (p.url.startsWith('data:')) return false; // data url works!
        const fn = p.url.split('/').pop();
        return !existingRoot.has(fn);
      });
      if (missing.length > 0) {
        console.log(`Report [${r.id}] (${r.team}, Day ${r.day}, "${r.school}"): ${missing.length} / ${photos.length} photos missing!`);
        missing.forEach(m => console.log(`   missing: id=${m.id}, url=${m.url}`));
      }
    });
  });
});
req.write(payload);
req.end();

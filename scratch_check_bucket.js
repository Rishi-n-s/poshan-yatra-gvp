const https = require('https');
const fs = require('fs');

const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlc29leHF5bXFqc3psZHJqcmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NDYxNDksImV4cCI6MjEwODMyMjE0OX0.9bsJf5lLQgSIVd9TVtLouTXFHP9Bt_pDKlKUEoQAFj0';

function post(url, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = https.request(url, {
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
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  const rootFiles = await post('https://gesoexqymqjszldrjrao.supabase.co/storage/v1/object/list/photos', { prefix: '', limit: 500 });
  const subFiles = await post('https://gesoexqymqjszldrjrao.supabase.co/storage/v1/object/list/photos', { prefix: 'photos', limit: 500 });
  console.log('Root files count:', rootFiles.length);
  console.log('Sub files count:', subFiles.length);

  const allBucketFiles = new Set();
  rootFiles.forEach(f => {
    if (f.name) allBucketFiles.add(f.name);
  });
  subFiles.forEach(f => {
    if (f.name) allBucketFiles.add('photos/' + f.name);
    if (f.name) allBucketFiles.add(f.name);
  });

  const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(content);
  const reports = Array.isArray(data) ? data : (data.value || []);
  
  console.log('\n--- Checking reports photos against bucket ---');
  let missingPhotos = [];
  let existingPhotos = [];

  reports.forEach(r => {
    (r.photos || []).forEach(p => {
      const pId = p.id || '';
      const url = p.url || '';
      const filename = url.split('/').pop();
      const inBucket = allBucketFiles.has(filename) || allBucketFiles.has(pId);
      if (inBucket) {
        existingPhotos.push({ reportId: r.id, school: r.school, photoId: pId, url, filename });
      } else {
        missingPhotos.push({ reportId: r.id, school: r.school, photoId: pId, url, filename });
      }
    });
  });

  console.log('Total existing in bucket:', existingPhotos.length);
  console.log('Total missing from bucket:', missingPhotos.length);
  console.log('\nMissing photos sample (up to 20):');
  missingPhotos.slice(0, 20).forEach(m => console.log(m));
}

run();

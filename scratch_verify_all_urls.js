const https = require('https');
const fs = require('fs');

const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reports = Array.isArray(data) ? data : (data.value || []);

function checkUrl(url) {
  return new Promise(resolve => {
    if (!url) return resolve({ ok: false, status: 0 });
    if (url.startsWith('data:')) return resolve({ ok: true, status: 200, isData: true });
    
    https.get(url, { method: 'HEAD' }, res => {
      resolve({ ok: res.statusCode === 200, status: res.statusCode });
    }).on('error', err => {
      resolve({ ok: false, status: 0, error: err.message });
    });
  });
}

async function run() {
  console.log('--- CHECKING ALL 108 PHOTO URLS ---');
  let totalOk = 0;
  let totalBroken = 0;

  for (let rIdx = 0; rIdx < reports.length; rIdx++) {
    const r = reports[rIdx];
    const photos = r.photos || [];
    console.log(`\nReport [${r.id}] (${r.team}, Day ${r.day}, "${r.school}") - ${photos.length} photos:`);
    const validPhotos = [];
    const brokenPhotos = [];

    for (let pIdx = 0; pIdx < photos.length; pIdx++) {
      const p = photos[pIdx];
      const res = await checkUrl(p.url);
      if (res.ok) {
        totalOk++;
        validPhotos.push(p);
        console.log(`  [${pIdx}] OK (${res.status}): ${p.id}`);
      } else {
        totalBroken++;
        brokenPhotos.push(p);
        console.log(`  [${pIdx}] BROKEN (${res.status}): ${p.id} -> ${p.url}`);
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`SUMMARY: Total OK = ${totalOk}, Total BROKEN = ${totalBroken}`);
  console.log(`========================================`);
}

run();

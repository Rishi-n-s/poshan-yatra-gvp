const https = require('https');
const fs = require('fs');

const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlc29leHF5bXFqc3psZHJqcmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NDYxNDksImV4cCI6MjEwODMyMjE0OX0.9bsJf5lLQgSIVd9TVtLouTXFHP9Bt_pDKlKUEoQAFj0';

function req(path, method, data) {
  return new Promise((resolve, reject) => {
    const payload = data ? JSON.stringify(data) : null;
    const options = {
      hostname: 'gesoexqymqjszldrjrao.supabase.co',
      path: path,
      method: method,
      headers: {
        'apikey': apikey,
        'Authorization': 'Bearer ' + apikey,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    };
    if (payload) {
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }
    const r = https.request(options, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    r.on('error', reject);
    if (payload) r.write(payload);
    r.end();
  });
}

function checkUrl(url) {
  return new Promise(resolve => {
    if (!url) return resolve(false);
    if (url.startsWith('data:')) return resolve(true);
    https.get(url, { method: 'HEAD' }, res => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function run() {
  console.log('Fetching all reports from Supabase...');
  const res = await req('/rest/v1/reports?select=*', 'GET');
  const reports = res.data;
  console.log(`Fetched ${reports.length} reports.`);

  // 1. Delete phantom empty report kodinar2_d2_1793082228727 if empty
  const phantom = reports.find(r => r.id === 'kodinar2_d2_1793082228727');
  if (phantom && (!phantom.school || phantom.school.trim() === '')) {
    console.log('Deleting phantom empty report kodinar2_d2_1793082228727...');
    await req('/rest/v1/reports?id=eq.kodinar2_d2_1793082228727', 'DELETE');
    console.log('Deleted phantom report!');
  }

  // 2. Process each report: deduplicate photos and remove 404 broken photos
  for (const r of reports) {
    if (r.id === 'kodinar2_d2_1793082228727') continue;
    const initialPhotos = r.photos || [];
    if (!initialPhotos.length) continue;

    console.log(`\nChecking photos for [${r.id}] (${r.school}). Initial count: ${initialPhotos.length}`);
    
    // For veraval1_d2 specifically, remove duplicate classroom photos [8], [9], [10]
    let filtered = initialPhotos;
    if (r.id === 'veraval1_d2') {
      console.log('veraval1_d2: deduplicating rapid burst photos...');
      // Photos 8, 9, 10, 11 were duplicate classroom photos. Keep photo 11, remove 8, 9, 10
      filtered = initialPhotos.filter(p => !['1793077683953_b7nidk.jpeg', '1793077686066_8umcs0.jpeg', '1793077687118_pkfz5l.jpeg'].includes(p.id));
      console.log(`veraval1_d2: reduced from ${initialPhotos.length} to ${filtered.length} photos`);
    }

    // Now verify URL accessibility for all photos in this report
    const validPhotos = [];
    for (const p of filtered) {
      const ok = await checkUrl(p.url);
      if (ok) {
        validPhotos.push(p);
      } else {
        console.log(`  Removing broken 404 photo: ${p.id} (${p.url})`);
      }
    }

    if (validPhotos.length !== initialPhotos.length) {
      console.log(`Updating [${r.id}] in Supabase: ${initialPhotos.length} -> ${validPhotos.length} photos`);
      const patchRes = await req(`/rest/v1/reports?id=eq.${r.id}`, 'PATCH', { photos: validPhotos });
      console.log(`Update result status: ${patchRes.status}`);
    } else {
      console.log(`[${r.id}] photos all valid (${validPhotos.length})`);
    }
  }

  console.log('\n--- CLEANUP COMPLETE ---');
}

run();


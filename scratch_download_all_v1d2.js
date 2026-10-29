const https = require('https');
const fs = require('fs');

const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reports = Array.isArray(data) ? data : (data.value || []);
const v1d2 = reports.find(r => r.id === 'veraval1_d2');

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', resolve);
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  if (!fs.existsSync('scratch_v1d2')) fs.mkdirSync('scratch_v1d2');
  for (let i = 0; i < v1d2.photos.length; i++) {
    const p = v1d2.photos[i];
    const dest = `scratch_v1d2/photo_${i}.jpg`;
    console.log(`Downloading [${i}] ${p.id}...`);
    try {
      await download(p.url, dest);
    } catch (e) {
      console.log(`Failed [${i}]: ${e.message}`);
    }
  }
  console.log('Done!');
}
run();

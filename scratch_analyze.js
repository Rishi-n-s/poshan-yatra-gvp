const fs = require('fs');
const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reports = Array.isArray(data) ? data : (data.value || []);
console.log('Total report rows:', reports.length);

reports.forEach((r, idx) => {
  const photoCount = Array.isArray(r.photos) ? r.photos.length : 0;
  console.log(`\n--- [${idx}] id: "${r.id}" | team: "${r.team}" (team_id: ${r.team_id}) | day: ${r.day} | date: ${r.date} | school: "${r.school}" | photos: ${photoCount} ---`);
  if (Array.isArray(r.photos) && r.photos.length > 0) {
    r.photos.forEach((p, pIdx) => {
      console.log(`  photo[${pIdx}]: id=${p.id} | url=${p.url}`);
    });
  }
});

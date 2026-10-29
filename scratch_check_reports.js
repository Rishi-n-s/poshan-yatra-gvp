const fs = require('fs');
const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reports = Array.isArray(data) ? data : (data.value || []);

console.log('--- ALL REPORTS ---');
reports.forEach((r, i) => {
  console.log(`[#${i}] id: "${r.id}", team_id: "${r.team_id}", team: "${r.team}", day: ${r.day}, date: "${r.date}", school: "${r.school}", created_at: "${r.created_at}", photosCount: ${(r.photos||[]).length}`);
});

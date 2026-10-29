const fs = require('fs');
const content = fs.readFileSync('scratch_reports.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);
const reports = Array.isArray(data) ? data : (data.value || []);

// Group by team and day
const groups = {};
reports.forEach(r => {
  const key = `${r.team_id}_d${r.day}`;
  if (!groups[key]) groups[key] = [];
  groups[key].push(r);
});

console.log('--- GROUPS BY TEAM & DAY ---');
for (const [key, list] of Object.entries(groups)) {
  console.log(`\nKey: ${key} (count: ${list.length})`);
  list.forEach(r => {
    console.log(`  id: ${r.id} | date: ${r.date} | school: "${r.school}" | photos: ${(r.photos||[]).length} | created: ${r.created_at}`);
  });
}

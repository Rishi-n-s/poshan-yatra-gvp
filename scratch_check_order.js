const https = require('https');
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlc29leHF5bXFqc3psZHJqcmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NDYxNDksImV4cCI6MjEwODMyMjE0OX0.9bsJf5lLQgSIVd9TVtLouTXFHP9Bt_pDKlKUEoQAFj0';

https.get('https://gesoexqymqjszldrjrao.supabase.co/rest/v1/reports?select=*&order=day', {
  headers: {
    'apikey': apikey,
    'Authorization': 'Bearer ' + apikey
  }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const list = JSON.parse(body);
    let P = list.flatMap(r => (r.photos || []).map(p => ({ ...p, r })));
    console.log('Total P count:', P.length);
    let displayed = P.slice(-48).reverse();
    displayed.slice(0, 30).forEach((p, i) => {
      console.log(`[${i}] ${p.r.school} - id: ${p.id}`);
    });
  });
});

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
    console.log('Item 78:', list[77]);
    console.log('Item 79:', list[78]);
  });
});
req.write(payload);
req.end();

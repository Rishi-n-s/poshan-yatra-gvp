const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

const urls = [
  'https://gesoexqymqjszldrjrao.supabase.co/storage/v1/object/public/photos/1793077683953_b7nidk.jpeg',
  'https://gesoexqymqjszldrjrao.supabase.co/storage/v1/object/public/photos/1793077686066_8umcs0.jpeg',
  'https://gesoexqymqjszldrjrao.supabase.co/storage/v1/object/public/photos/1793077687118_pkfz5l.jpeg',
  'https://gesoexqymqjszldrjrao.supabase.co/storage/v1/object/public/photos/1793077687921_tl40o9.jpeg'
];

urls.forEach((u, i) => {
  https.get(u, res => {
    const chunks = [];
    res.on('data', c => chunks.push(c));
    res.on('end', () => {
      const buf = Buffer.concat(chunks);
      const hash = crypto.createHash('md5').update(buf).digest('hex');
      console.log(`[${i}] size: ${buf.length}, md5: ${hash}`);
    });
  });
});

const fs = require('fs');

for (let i = 0; i < 12; i++) {
  const stat = fs.statSync(`scratch_v1d2/photo_${i}.jpg`);
  console.log(`photo_${i}.jpg: size=${stat.size}`);
}

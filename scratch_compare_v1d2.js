const fs = require('fs');

// We have 12 downloaded photos in scratch_v1d2: photo_0.jpg to photo_11.jpg
// Let's compare them pixel by pixel or by buffer
const bufs = [];
for (let i = 0; i < 12; i++) {
  bufs.push(fs.readFileSync(`scratch_v1d2/photo_${i}.jpg`));
}

console.log('Comparing 12 photos in veraval1_d2:');
for (let i = 0; i < 12; i++) {
  for (let j = i + 1; j < 12; j++) {
    // Check if lengths are similar (within 5%)
    const diff = Math.abs(bufs[i].length - bufs[j].length);
    const avg = (bufs[i].length + bufs[j].length) / 2;
    if (diff / avg < 0.05) {
      console.log(`photo_${i} (${bufs[i].length}) and photo_${j} (${bufs[j].length}) have very close sizes! Diff: ${diff}`);
    }
  }
}

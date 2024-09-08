const { exec } = require('child_process');
const path = require('path');

const tempAudioPath = path.join(__dirname, 'temp-audio.wav');

exec(`whisper ${tempAudioPath} --model small --output_format json`, (err, stdout, stderr) => {
  if (err) {
    console.error('Error generating transcript:', err);
    return;
  }
  console.log('Transcript generated:', stdout);
});

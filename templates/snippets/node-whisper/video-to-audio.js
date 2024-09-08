const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

// Input video file path
const inputFilePath = path.join(__dirname, 'sample.mp4');

// Output audio file path
const outputFilePath = path.join(__dirname, 'output-audio.wav');

// Convert video to WAV
ffmpeg(inputFilePath)
  .output(outputFilePath)
  .audioCodec('pcm_s16le')  // Set WAV format
  .on('end', () => {
    console.log('Conversion complete');
  })
  .on('error', (err) => {
    console.error('Error during conversion: ', err);
  })
  .run();

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const { exec } = require('child_process');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

// Input video file path
const inputVideoPath = path.join(__dirname, 'sample.mp4');

// Temporary audio file path
const tempAudioPath = path.join(__dirname, 'temp-audio.wav');

// Extract audio from video
ffmpeg(inputVideoPath)
  .output(tempAudioPath)
  .audioCodec('pcm_s16le') // WAV format
  .on('end', () => {
    console.log('Audio extracted. Starting transcription...');

    // Call whisper command-line tool to generate transcript
    exec(`whisper ${tempAudioPath} --model small --output_format json`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error generating transcript:', err);
        return;
      }
      console.log('Transcript generated:', stdout);
    });
  })
  .on('error', (err) => {
    console.error('Error extracting audio:', err);
  })
  .run();

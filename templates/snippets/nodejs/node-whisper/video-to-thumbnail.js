const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static').path;
const path = require('path');

// Set ffmpeg and ffprobe paths
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// Input video file path
const inputFilePath = path.join(__dirname, 'sample.mp4');

// Generate thumbnail
ffmpeg(inputFilePath)
  .screenshots({
    timestamps: ['50%'], // Take a screenshot at the middle of the video
    filename: 'thumbnail.png',
    folder: __dirname,   // Save the thumbnail in the current directory
    size: '320x240'      // Thumbnail size
  })
  .on('end', () => {
    console.log('Thumbnail generated successfully');
  })
  .on('error', (err) => {
    console.error('Error generating thumbnail: ', err);
  });

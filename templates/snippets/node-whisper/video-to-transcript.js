const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const whisper = require('whisper-node');

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
  .on('end', async () => {
    console.log('Audio extracted, starting transcription...');

    // Generate transcript
    try {
        const filePath = tempAudioPath; // Use the temporary audio file path

        const options = {
          modelName: "base.en",       // Ensure this model name is correct
          whisperOptions: {
            language: 'auto',          // Default, auto detect
            gen_file_txt: false,      // Do not generate .txt file
            gen_file_subtitle: false, // Do not generate .srt file
            gen_file_vtt: false,      // Do not generate .vtt file
            word_timestamps: true     // Include timestamps for every word
          }
        }

        const transcript = await whisper.whisper(filePath, options);

        // Format transcript with timestamps
        const formattedTranscript = transcript?.segments?.map(segment => ({
          start: new Date(segment.start * 1000).toISOString().substr(11, 12), // Convert seconds to HH:MM:SS.mmm
          end: new Date(segment.end * 1000).toISOString().substr(11, 12),
          speech: segment.text.trim(),
        }));

        console.log('Transcript generated:', JSON.stringify(formattedTranscript, null, 2));
    } catch (error) {
      console.error('Error generating transcript:', error);
    }
  })
  .on('error', (err) => {
    console.error('Error extracting audio:', err);
  })
  .run();

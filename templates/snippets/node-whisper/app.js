import path from 'path';
import { fileURLToPath } from 'url';
import whisper from 'whisper-node';
import { nodewhisper } from 'nodejs-whisper';

// Helper function to get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function transcribeAudio() {
  try {
    const transcript = await whisper.whisper('./sample.wav');
    console.log('Transcript:', transcript);
  } catch (error) {
    console.error('Error transcribing audio:', error);
  }
}

async function transcribeAudio1() {
  const filePath = path.resolve(__dirname, 'sample.wav');
  await nodewhisper(filePath, {
    modelName: 'base.en',
    whisperOptions: {
      outputInText: false,
      outputInVtt: false,
      outputInSrt: true,
      outputInCsv: false,
      translateToEnglish: false,
      language: 'en',
      wordTimestamps: false,
      timestamps_length: 20,
      splitOnWord: true,
    },
  });
}

transcribeAudio1();

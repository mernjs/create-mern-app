import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

// Add custom styles for the timeline
const customStyles = `
  .timeline-container {
    position: relative;
    background: #f0f0f0;
    border-radius: 4px;
    padding: 20px 0;
    margin: 20px 0;
  }

  .timeline-markers {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    bottom: -20px;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .timeline-marker {
    color: #666;
    font-size: 12px;
  }

  .range-slider {
    height: 8px !important;
    background: #ddd !important;
    border-radius: 4px;
  }

  .range-slider .range-slider__range {
    background: linear-gradient(90deg, #8a2be2, #9400d3) !important;
    border-radius: 4px;
  }

  .range-slider .range-slider__thumb {
    width: 4px !important;
    height: 100px !important;
    border-radius: 0 !important;
    background: linear-gradient(180deg, #8a2be2, #9400d3) !important;
    cursor: col-resize !important;
    top: -46px !important;
  }

  .range-slider .range-slider__thumb::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: #fff;
    border: 2px solid #8a2be2;
    border-radius: 50%;
  }

  .thumbnail-strip {
    display: flex;
    overflow-x: hidden;
    margin-bottom: 10px;
    height: 90px;
    background: #000;
  }

  .thumbnail {
    flex-shrink: 0;
    height: 100%;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }

  .time-display {
    position: absolute;
    top: -25px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
    transform: translateX(-50%);
  }

  .trim-handle {
    position: absolute;
    width: 4px;
    height: 100px;
    background: linear-gradient(180deg, #8a2be2, #9400d3);
    top: -46px;
    cursor: col-resize;
    z-index: 10;
  }
`;

const VideoEditor = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [timeRange, setTimeRange] = useState([0, 100]);
  const [duration, setDuration] = useState(0);
  const [trimmedVideoUrl, setTrimmedVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const ffmpegRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        const ffmpeg = new FFmpeg();
        ffmpeg.on('log', ({ message }) => {
          console.log(message);
        });
        ffmpeg.on('progress', ({ progress }) => {
          setProgress(Math.round(progress * 100));
        });
        await ffmpeg.load();
        ffmpegRef.current = ffmpeg;
        setLoading(false);
      } catch (err) {
        console.error('Error loading FFmpeg:', err);
        setError('Failed to load FFmpeg. Please try again.');
        setLoading(false);
      }
    };
    loadFFmpeg();
  }, []);

  const generateThumbnails = async (file) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    await video.load();

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const thumbnailWidth = 160;
    const thumbnailHeight = 90;
    canvas.width = thumbnailWidth;
    canvas.height = thumbnailHeight;

    return new Promise((resolve) => {
      video.addEventListener('loadedmetadata', async () => {
        const duration = video.duration;
        const numberOfThumbnails = 10;
        const interval = duration / numberOfThumbnails;
        const thumbnails = [];

        for (let i = 0; i < numberOfThumbnails; i++) {
          const time = i * interval;
          video.currentTime = time;
          await new Promise(resolve => {
            video.addEventListener('seeked', () => {
              context.drawImage(video, 0, 0, thumbnailWidth, thumbnailHeight);
              thumbnails.push({
                time,
                url: canvas.toDataURL(),
              });
              resolve();
            }, { once: true });
          });
        }

        resolve(thumbnails);
      });
    });
  };

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
      setTrimmedVideoUrl('');
      setTimeRange([0, 100]);
      const thumbnails = await generateThumbnails(file);
      setThumbnails(thumbnails);
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
    setTimeRange([0, duration]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const trimVideo = async () => {
    if (!videoSrc) {
      setError('Please upload a video first.');
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputFileName = 'input.mp4';
      const trimmedFileName = 'trimmed.mp4';

      await ffmpeg.writeFile(inputFileName, await fetchFile(videoSrc));

      const startTime = timeRange[0];
      const trimDuration = timeRange[1] - timeRange[0];

      await ffmpeg.exec([
        '-ss', String(startTime),
        '-i', inputFileName,
        '-t', String(trimDuration),
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-strict', 'experimental',
        '-b:a', '128k',
        trimmedFileName
      ]);

      const data = await ffmpeg.readFile(trimmedFileName);
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      setTrimmedVideoUrl(url);
    } catch (err) {
      console.error('Error trimming video:', err);
      setError('Failed to trim video. Please try again.');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <style>{customStyles}</style>
      
      <div className="space-y-4">
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          disabled={loading}
          className="mb-4"
        />

        {videoSrc && (
          <>
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
              <ReactPlayer
                ref={playerRef}
                url={videoSrc}
                controls
                width="100%"
                height="100%"
                onDuration={handleDuration}
              />
            </div>

            <div className="timeline-container">
              <div className="thumbnail-strip">
                {thumbnails.map((thumbnail, index) => (
                  <div
                    key={index}
                    className="thumbnail"
                    style={{ width: `${100 / thumbnails.length}%` }}
                  >
                    <img 
                      src={thumbnail.url}
                      alt={`Frame ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="time-display" style={{ left: `${(timeRange[0] / duration) * 100}%` }}>
                  {formatTime(timeRange[0])}
                </div>
                <div className="time-display" style={{ left: `${(timeRange[1] / duration) * 100}%` }}>
                  {formatTime(timeRange[1])}
                </div>

                <RangeSlider
                  className="range-slider"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={timeRange}
                  onInput={setTimeRange}
                />

                <div className="timeline-markers">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div key={i} className="timeline-marker">
                      {formatTime((duration * i) / 10)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={trimVideo}
                disabled={loading}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 
                         disabled:bg-purple-300 transition-colors duration-200"
              >
                {loading ? `Processing ${progress}%` : 'Trim Video'}
              </button>
            </div>

            {trimmedVideoUrl && (
              <div className="mt-8 space-y-4">
                <h2 className="text-xl font-semibold">Trimmed Video</h2>
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                  <ReactPlayer url={trimmedVideoUrl} controls width="100%" height="100%" />
                </div>
                <div className="flex justify-center">
                  <a
                    href={trimmedVideoUrl}
                    download="trimmed_video.mp4"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 
                             transition-colors duration-200"
                  >
                    Download Trimmed Video
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoEditor;
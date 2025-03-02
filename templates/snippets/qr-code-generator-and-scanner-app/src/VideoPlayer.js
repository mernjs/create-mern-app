import React, { useRef, useState, useEffect } from 'react';

const Player = ({ videoSrc, posterSrc, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      setIsMuted(!isMuted);
      videoRef.current.muted = !isMuted;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (isFullscreen) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
      setIsPlaying(true);
    }
  }, [videoSrc, isMuted]);

  return (
    <div className="max-w-4xl mx-auto my-8 bg-black rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-[56.25%] aspect-w-16 aspect-h-9">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoSrc}
        //   poster={posterSrc} 
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          controls={false} 
          autoPlay 
          muted={isMuted} 
        >
          Your browser does not support the video tag.
        </video>

        <div className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 ${isPlaying ? 'hidden' : 'block'}`}>
          <button onClick={togglePlayPause} className="text-white text-5xl">
            ▶️
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-900 flex justify-between items-center">
        <div>
          <h2 className="text-white text-lg font-semibold">{title}</h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="text-white text-2xl hover:text-gray-400"
          >
            {isPlaying ? '❚❚' : '▶️'}
          </button>

          <button
            onClick={toggleMute}
            className="text-white text-2xl hover:text-gray-400"
          >
            {isMuted ? '🔊' : '🔇'}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={isMuted || !videoRef.current ? 0 : videoRef.current.volume * 100}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.volume = e.target.value / 100;
                setIsMuted(videoRef.current.volume === 0);
              }
            }}
            className="w-20 h-2 bg-gray-600 rounded-md cursor-pointer"
          />

          <div className="flex items-center space-x-2 w-48">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              value={(currentTime / duration) * 100 || 0}
              onChange={(e) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = (e.target.value / 100) * duration;
                  setCurrentTime(videoRef.current.currentTime);
                }
              }}
              className="w-full h-2 bg-gray-600 rounded-md cursor-pointer"
            />
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="text-white text-2xl hover:text-gray-400"
          >
            {isFullscreen ? '⛶' : '🔲'}
          </button>
        </div>
      </div>
    </div>
  );
};


const VideoPlayer = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Player
        videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
        posterSrc="https://www.w3schools.com/html/pic_trulli.jpg"
        title="Sample Video"
      />
    </div>
  );
};

export default VideoPlayer;

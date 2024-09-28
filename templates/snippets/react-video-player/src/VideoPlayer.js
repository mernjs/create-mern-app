// src/VideoPlayer.js
import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, segments, onSegmentEnd }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [shouldSeek, setShouldSeek] = useState(false);

  const handleProgress = (state) => {
    if (playerRef.current && segments.length > 0) {
      const currentTime = state.playedSeconds;
      const currentSegment = segments[currentSegmentIndex];

      // Pause if the video has reached or exceeded the end of the current segment
      if (currentTime >= currentSegment.end) {
        setPlaying(false);
        if (onSegmentEnd) {
          onSegmentEnd(currentSegmentIndex);
        }
        // Move to the next segment
        setCurrentSegmentIndex((prevIndex) => (prevIndex + 1) % segments.length);
        // Set flag to seek to the start of the next segment
        setShouldSeek(true);
      }
    }
  };

  useEffect(() => {
    if (shouldSeek && playerRef.current && segments.length > 0) {
      const currentSegment = segments[currentSegmentIndex];
      playerRef.current.seekTo(currentSegment.start, 'seconds');
      setShouldSeek(false);
    }
  }, [shouldSeek, currentSegmentIndex]);

  const handlePlay = () => {
    // Set to resume play manually when needed
    setPlaying(true);
  };

  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      playing={playing}
      onProgress={handleProgress}
      onEnded={() => setPlaying(false)}
      controls
      onPlay={handlePlay}
    />
  );
};

export default VideoPlayer;

import React, { useRef, useState } from "react";
import video from '../src/assets/video.mp4'
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Play/pause video
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update progress
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Seek to different parts of the video
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
  };

  // Fullscreen toggle
  const handleFullScreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // On video load, set duration
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="relative bg-black">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="text-white"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          {/* Seek Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full"
            aria-label="Seek video"
          />

          {/* Volume Control */}
           <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20"
            aria-label="Volume control"
          /> 

          {/* Fullscreen Toggle */}
           <button
            onClick={handleFullScreen}
            className="text-white"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

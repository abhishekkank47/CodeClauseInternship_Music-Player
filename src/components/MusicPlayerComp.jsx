import React, { useEffect, useState, useRef } from "react";
import SongsData from "../Data/SongsData.json";

const MusicPlayerComp = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress of the song
  const audioRef = useRef(null);

  const currentTrack = SongsData[currentSongIndex];
  const nextSongIndex = (currentSongIndex + 1) % SongsData.length;
  const prevSongIndex = (currentSongIndex - 1 + SongsData.length) % SongsData.length;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration;
        const currentTime = audioRef.current.currentTime;
        setProgress((currentTime / duration) * 100);
      }
    };

    // Update progress every second
    const interval = setInterval(updateProgress, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const skipSong = (forwards = true) => {
    setCurrentSongIndex((prevIndex) =>
      forwards ? nextSongIndex : prevSongIndex
    );
    setProgress(0); // Reset progress bar
    setIsPlaying(true); // Auto-play the next song
  };

  return (
    <div className="bg-gray-100 p-4 flex justify-center items-center h-screen bg-gradient-to-r from-black to-red-500 background">
      <div className="bg-black p-8 rounded-lg shadow-md w-80">
        {/* Album Cover */}
        <img
          src={currentTrack.image_src}
          alt={currentTrack.song_name}
          className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg"
        />

        {/* Song Title */}
        <h2 className="text-white text-xl font-semibold text-center">{currentTrack.song_name}</h2>

        {/* Artist Name */}
        <p className="text-white text-sm text-center">{currentTrack.artist}</p>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={currentTrack.song_src}
          onEnded={() => skipSong(true)} // Auto-skip to the next song when the current song ends
        />

        {/* Music Controls */}
        <div className="mt-6 flex justify-center items-center">
          <button
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={() => skipSong(false)} // Skip backward
          >
            {/* Previous Song Icon */}
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-gray-600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="matrix(-1, 0, 0, 1, 0, 0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z"
                  fill="#000000"
                />
                <path
                  d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </button>
          <button
            className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none mx-4"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              // Pause Icon
              <svg
                width="64px"
                height="64px"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-gray-600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
                    fill="#000000"
                  />
                  <path
                    d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
                    fill="#000000"
                  />
                </g>
              </svg>
            ) : (
              // Play Icon
              <svg
                width="64px"
                height="64px"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-gray-600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.516 1.147C3.898.811 3 .251 3 .932V23.068c0 .681.898.121 1.516-.315L19.829 12.947c.617-.436.617-1.458 0-1.895L4.516 1.147z"
                    fill="#000000"
                  />
                </g>
              </svg>
            )}
          </button>
          <button
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={() => skipSong(true)} // Skip forward
          >
            {/* Next Song Icon */}
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-gray-600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z"
                  fill="#000000"
                />
                <path
                  d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-gray-200 h-2 rounded-full">
          <div
            className="bg-yellow-300 h-2 rounded-full"
            style={{ width: `${progress}%` }} // Dynamically set the width based on progress
          />
        </div>

        {/* Time Information */}
        <div className="flex justify-between mt-2 text-sm text-white">
          <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "00:00"}</span>
          <span>{audioRef.current ? formatTime(audioRef.current.duration) : "00:00"}</span>
        </div>
        <center>
          <p className="text-gray-400 text-sm pt-10">Playing Next : {SongsData[nextSongIndex].song_name}</p>
        </center>
      </div>
    </div>
  );
};

// Helper function to format time
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default MusicPlayerComp;





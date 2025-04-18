import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId }) => {
  const opts = {
    width: "100%", // Full width
    height: "100%", // Full height
    playerVars: {
      autoplay: 1, // Auto-play the video
    },
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-video">
      <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
    </div>
  );
};

export default YouTubePlayer;

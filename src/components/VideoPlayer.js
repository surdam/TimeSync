import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url, onProgress, playing, played }) => {
  return (
    <ReactPlayer
      url={url}
      controls
      onProgress={onProgress}
      playing={playing}
      played={played}
      width="100%"
      height="100%"
      className="react-player"
    />
  );
};

export default VideoPlayer;

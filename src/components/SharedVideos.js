import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import VideoComment from "./VideoComment";

const getEmbeddableUrl = (url) => {
  const fileId = url.match(/[-\w]{25,}/);
  return fileId
    ? `https://drive.google.com/uc?export=view&id=${fileId[0]}`
    : "";
};

const SharedVideos = () => {
  const { id } = useParams();
  const [videoLinks, setVideoLinks] = useState([]);
  const [comments, setComments] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDurations, setVideoDurations] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideoLinks = async () => {
      const doc = await db.collection("videoLinks").doc(id).get();
      if (doc.exists) {
        setVideoLinks(doc.data().links);
      }
    };

    fetchVideoLinks();
  }, [id]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    videoRefs.current.forEach((video) => {
      playing ? video.pause() : video.play();
    });
  };

  const handleScrubberChange = (e) => {
    setCurrentTime(e.target.value);
    videoRefs.current.forEach((video) => {
      video.currentTime = e.target.value;
    });
  };

  const handleVideoDuration = (index, duration) => {
    setVideoDurations((prevDurations) => {
      const newDurations = [...prevDurations];
      newDurations[index] = duration;
      return newDurations;
    });
  };

  const handleCommentSubmit = (text) => {
    setComments((prevComments) => [...prevComments, { text }]);
  };

  const longestDuration = Math.max(...videoDurations);

  return (
    <div>
      <h1>Shared Videos</h1>
      <div className="video-container">
        {videoLinks.map((videoLink, index) => (
          <div key={index} className="video-player">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              title={`video-${index}`}
              src={getEmbeddableUrl(videoLink)}
              controls
              style={{ width: "100%", height: "auto" }}
              onLoadedMetadata={(e) =>
                handleVideoDuration(index, e.target.duration)
              }
            />
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handlePlayPause}>{playing ? "Pause" : "Play"}</button>
        <input
          type="range"
          min="0"
          max={longestDuration}
          value={currentTime}
          onChange={handleScrubberChange}
        />
      </div>
      <div>
        <h2>Comments</h2>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
          </div>
        ))}
        <VideoComment onSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default SharedVideos;

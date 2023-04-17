import React, { useState } from "react";
import db from "../firebase";
import { v4 as uuidv4 } from "uuid";

const VideoForm = () => {
  const [videoLinks, setVideoLinks] = useState([""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = uuidv4();
    await db
      .collection("videoLinks")
      .doc(id)
      .set({ links: videoLinks.filter((link) => link) });
    window.location.href = `/share/${id}`;
  };

  const handleChange = (e, index) => {
    const newVideoLinks = [...videoLinks];
    newVideoLinks[index] = e.target.value;
    setVideoLinks(newVideoLinks);
  };

  const handleAddLink = () => {
    setVideoLinks([...videoLinks, ""]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Video Links</h1>
      {videoLinks.map((videoLink, index) => (
        <div key={index}>
          <label htmlFor={`video-link-${index}`}>Video Link {index + 1}</label>
          <input
            id={`video-link-${index}`}
            type="text"
            value={videoLink}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddLink}>
        Add another video link
      </button>
      <br />
      <button type="submit">Generate Shareable Link</button>
    </form>
  );
};

export default VideoForm;

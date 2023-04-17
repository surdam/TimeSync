import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoForm from "./components/VideoForm";
import SharedVideos from "./components/SharedVideos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VideoForm />} />
        <Route
          path="/share/:id"
          element={<SharedVideos />}
          children={({ match }) => <SharedVideos id={match.params.id} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

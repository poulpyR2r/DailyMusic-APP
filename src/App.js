import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMusicToSession from "./pages/AddMusicToSession";
import VoteMusicToSession from "./pages/VoteMusicToSession";
import "./App.css";
import CreateSessionPage from "./pages/CreateSessionPage";
import Callback from "./Config/spotify/Callback";
import Pages404 from "./pages/Pages404";
import ShowSessionPage from "./pages/ShowSessionPage";
import ContactPages from "./pages/ContactPages";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 to-primary-900 text-white p-4">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create-sessions"
            element={<CreateSessionPage />}
          ></Route>
          <Route path="/add-music/:sessionId" element={<AddMusicToSession />} />
          <Route path="/show-sessions" element={<ShowSessionPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<ContactPages />} />
          <Route
            path="/vote-music/:sessionId"
            element={<VoteMusicToSession />}
          />
          <Route path="*" element={<Pages404>Not Found</Pages404>} />

          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

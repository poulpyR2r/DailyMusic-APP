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
import ShowSession from "./component/ShowSession";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-session" element={<CreateSessionPage />}></Route>
          <Route path="/add-music/:sessionId" element={<AddMusicToSession />} />
          <Route path="/home" element={<ShowSession />} />
          <Route
            path="/vote-music/:sessionId"
            element={<VoteMusicToSession />}
          />

          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

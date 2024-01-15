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

import "./App.css";
import  CreateSessionPage  from "./pages/CreateSessionPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-session" element={<CreateSessionPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

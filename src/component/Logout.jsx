import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("authTokenSpotify");
    localStorage.removeItem("userVotes");
    navigate("/home");
    window.location.reload(false);
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default Logout;

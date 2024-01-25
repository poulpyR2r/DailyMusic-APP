import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddMusic from "../component/AddMusic";
import NavBar from "../component/NavBar";
import { decodeToken } from "../services/tokenService";

const AddMusicToSession = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
        if (decodedToken.role === "user") {
          navigate("/home");
        }
      }
    }
  }, [token]);

  if (!sessionStorage.getItem("authTokenSpotify")) {
    window.location.href = "/create-sessions";
  }
  const { sessionId } = useParams();
  const tokenSpotify = sessionStorage.getItem("authTokenSpotify");

  return (
    <>
      <NavBar token={token} userRole={userRole}></NavBar>
      <AddMusic sessionId={sessionId} tokenSpotify={tokenSpotify}></AddMusic>;
    </>
  );
};

export default AddMusicToSession;

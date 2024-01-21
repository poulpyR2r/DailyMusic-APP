import React, { useEffect, useState } from "react";
import CreateSession from "../component/CreateSession";
import NavBar from "../component/NavBar";
import { decodeToken } from "../services/tokenService";
import { useNavigate } from "react-router-dom";

export const CreateSessionPage = () => {
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

  return (
    <>
      <NavBar token={token} userRole={userRole}></NavBar>
      <CreateSession token={token} userRole={userRole}></CreateSession>
    </>
  );
};

export default CreateSessionPage;

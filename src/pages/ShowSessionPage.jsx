import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import ShowSession from "../component/ShowSession";
import { decodeToken } from "../services/tokenService";
import { useNavigate } from "react-router-dom";

const ShowSessionPage = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
      }
    }
  }, [token]);
  return (
    <div className="">
      <NavBar token={token} userRole={userRole}></NavBar>
      <ShowSession></ShowSession>
    </div>
  );
};

export default ShowSessionPage;

import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import DailyMusic from "../component/DailyMusic";
import { decodeToken } from "../services/tokenService";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
      }
    }
  }, [token]);
  return (
    <>
      <NavBar token={token} userRole={userRole}></NavBar>
      <DailyMusic token={token}></DailyMusic>
    </>
  );
};

export default Home;

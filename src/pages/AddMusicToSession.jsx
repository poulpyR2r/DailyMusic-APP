import React from "react";
import { useParams } from "react-router-dom";
import AddMusic from "../component/AddMusic";

const AddMusicToSession = () => {
  if (!sessionStorage.getItem("authTokenSpotify")) {
    window.location.href = "/create-session";
  }
  const { sessionId } = useParams();
  const token = sessionStorage.getItem("authTokenSpotify");
  console.log(sessionId);
  console.log(token);
  return <AddMusic sessionId={sessionId} tokenSpotify={token}></AddMusic>;
};

export default AddMusicToSession;

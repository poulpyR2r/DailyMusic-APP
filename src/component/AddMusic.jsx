import React, { useEffect, useState } from "react";
import sessionServices from "../services/sessionServices";
import Search from "../Config/spotify/Search";
import api from "../Config/axiosApi";

const AddMusic = ({ sessionId, tokenSpotify }) => {
  const [session, setSession] = useState(null); // State should hold an object, not an array

  


  const getSession = async () => {
    const response = await sessionServices.getSessions(sessionId);
    if (
      response.status === 200 &&
      response.data &&
      response.data.votingSession
    ) {
      setSession(response.data.votingSession); // Set the votingSession object
    }
  };

  useEffect(() => {
    getSession();
  }, [sessionId]);

  return (
    <div>
      {session && (
        <>
          <h2>{session.module_name}</h2>
          <p>
            Expiration Date:{" "}
            {new Date(session.expiration_date).toLocaleDateString()}
          </p>
          {Array.isArray(session.musics) && session.musics.length > 0 ? (
            session.musics.map((music, index) => (
              <div key={index}>{music.name}</div>
            ))
          ) : (
            <p>No music added yet</p>
          )}
        </>
      )}

      <Search tokenSpotify={tokenSpotify} />
    </div>
  );
};

export default AddMusic;

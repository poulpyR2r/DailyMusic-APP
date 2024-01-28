import React, { useEffect, useState } from "react";
import sessionServices from "../services/sessionServices";
import Search from "../Config/spotify/Search";

const AddMusic = ({ sessionId, tokenSpotify }) => {
  const [session, setSession] = useState(null);
  const [musics, setMusics] = useState([]);
  console.log(musics);
  
  const getSession = async () => {
    const response = await sessionServices.getSessions(sessionId);
  
    if (
      response.status === 200 &&
      response.data &&
      response.data.votingSession
    ) {
      setSession(response.data.votingSession);
    }
  };

  const getMusicBySession = async () => {
    const response = await sessionServices.getMusicBySession(sessionId);
    if (response.status === 200 && response.data && response.data.musics) {
      setMusics(response.data.musics);
    }
  };

  const handleDeleteMusic = async (sessionId, musicId) => {
    const response = await sessionServices.deleteMusicFromSession(
      sessionId,
      musicId
    );
    if (response.status === 200) {
      getMusicBySession();
    }
  };

  useEffect(() => {
    getSession();
    getMusicBySession();
  }, [sessionId]);

  return (
    <div className="">
      <div className=" mx-auto flex flex-col items-center">
        {session && (
          <>
            <h2 className="text-4xl font-bold mb-8">{session.module_name}</h2>

            {musics.length > 0 && (
              <div className="flex items-start w-full justify-center">
                <p className="mb-4">Musique déja ajoutée :</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-8">
              {musics.map((music) => (
                <div
                  key={music._id}
                  className="bg-white/10 backdrop-blur-md rounded p-4 max-w-xs text-center relative"
                >
                  <button
                    onClick={() => handleDeleteMusic(session._id, music._id)}
                    className="absolute top-0 right-0 text-red-500 hover:text-red-600 p-1"
                  >
                    ✕
                  </button>
                  
                  <h5 className="font-semibold mb-2 mt-3">{music.title}</h5>
                  <p>{music.artist}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <Search tokenSpotify={tokenSpotify} sessionId={sessionId} />
      </div>
    </div>
  )
}

export default AddMusic

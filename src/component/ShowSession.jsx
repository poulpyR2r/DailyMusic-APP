import React, { useState, useEffect } from "react";
import sessionServices from "../services/sessionServices";
import voteService from "../services/voteService";

import { decodeToken } from "../services/tokenService";
import Swal from "sweetalert2";

const ShowSession = () => {
  const [sessions, setSessions] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserId(decodedToken.id);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await sessionServices.getAllSessions();
      if (response.data && response.data.data) {
        const sessionsData = response.data.data.votingSessions;
        const sessionsWithMusicDetails = await Promise.all(
          sessionsData.map(async (session) => {
            const musicResponse = await sessionServices.getMusicBySession(
              session._id
            );

            // Trier les musiques par vote_count en ordre décroissant
            const sortedMusics = musicResponse.data.musics.sort(
              (a, b) => b.vote_count - a.vote_count
            );

            return { ...session, musics: sortedMusics };
          })
        );
        setSessions(sessionsWithMusicDetails);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des sessions:", error);
    }
  };
  const handleVote = async (musicId) => {
    try {
      const response = await voteService.voteForMusic({ userId, musicId });
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Merci pour votre vote",
        });
        fetchSessions();
      }
    } catch (error) {
      console.error("Erreur lors du vote:", error);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sessions.map((session) => (
        console.log("session", session),
        <div
          key={session._id}
          className="max-w-sm p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
        >
          <h5 className="mb-2 text-2xl font-semibold text-gray-900">
            {session.module_name}
          </h5>
          <p className="mb-3 text-gray-700">
            <span className="font-medium">Expiration:</span>{" "}
            {new Date(session.expiration_date).toLocaleDateString()}
          </p>
          <p className="mb-3 text-gray-700">
            <span className="font-medium">Catégorie:</span> {session.categorie}
          </p>
          <h4 className="font-semibold text-gray-900 mb-2">Musiques:</h4>

          <div className=" flex flex-col gap-3">
            {session.musics.map((music, idx) => (
              <>
                <div
                  key={idx}
                  className="text-gray-700 rounded bg-red-200 flex justify-between items-center"
                >
                  <div className="m-2">
                    {music.title} - {music.artist}
                  </div>
                  <div className="flex ali">
                    <button
                      className="m-2"
                      onClick={() => handleVote(music._id)}
                    >
                      upVote
                    </button>
                    <div className="m-2">{music.vote_count}</div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowSession;

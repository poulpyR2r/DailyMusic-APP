import React, { useState, useEffect } from "react";
import sessionServices from "../services/sessionServices";
import voteService from "../services/voteService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { decodeToken } from "../services/tokenService";
import Swal from "sweetalert2";
import DailyMusic from "./DailyMusic";
import "../component/Showsessions.css";
import CalculeRates from "./CalculeRates";
import Explication from "./Explication";
const ShowSession = () => {
  const [sessions, setSessions] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userVotes, setUserVotes] = useState({});
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserId(decodedToken.id);
        setUserRole(decodedToken.role);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const isResultDay = (expirationDate) => {
    const currentDate = new Date("2024-01-26T00:00:00");

    // const currentDate = new Date(); // Date actuelle
    const expiration = new Date(expirationDate);
    const dayAfterExpiration = new Date(expiration);
    dayAfterExpiration.setDate(expiration.getDate() + 1);

    return (
      currentDate.getDate() === dayAfterExpiration.getDate() &&
      currentDate.getMonth() === dayAfterExpiration.getMonth() &&
      currentDate.getFullYear() === dayAfterExpiration.getFullYear()
    );
  };

  const isExpired = (expirationDate) => {
    const currentDate = new Date("2024-01-26T00:00:00");

    // const currentDate = new Date(); // Date actuelle
    const expiration = new Date(expirationDate);
    const twoDaysAfterExpiration = new Date(expiration + 2);
    console.log("twoDaysAfterExpiration", twoDaysAfterExpiration);
    twoDaysAfterExpiration.setDate(expiration.getDate());

    // Vérifie si la date actuelle est après le jour des résultats
    return currentDate > twoDaysAfterExpiration;
  };

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

  const handleVote = async (musicId, sessionId) => {
    try {
      const response = await voteService.voteForMusic({
        userId,
        musicId,
        sessionId,
      });
      if (response.status === 201) {
        fetchSessions();
      }
    } catch (error) {
      console.error("Erreur lors du vote:", error);
    }
  };

  if (!sessions.length)
    return (
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-4xl font-bold mb-4 mt-28 text-white">
          Reviens plus tard il n'y a pas de session pour le moment !{" "}
        </h2>
        <span class="loader mt-5"></span>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center">
      <Explication
        text={
          "Ici, tu trouveras toutes les sessions de vote. Tu peux participer en votant à l'aide de la flèche. Souviens-toi, tu peux voter jusqu'à la fin de la date d'expiration, mais choisis judicieusement car tu as droit à un seul vote par session. Les résultats seront visibles le lendemain de la fin de la session."
        }
      ></Explication>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sessions.map((session) => {
          if (isResultDay(session.expiration_date)) {
            return (
              <div className="max-w-sm p-6  font-heading rounded-lg shadow-xl bg-white/10 backdrop-blur-md hover:shadow-lg transition-shadow duration-300 text-left animate-fadeIn">
                <CalculeRates
                  key={session._id}
                  name={session.module_name}
                  sessionId={session._id}
                  categorie={session.categorie}
                />
              </div>
            );
          }

          if (!isExpired(session.expiration_date)) {
            return (
              <div
                key={session._id}
                className="max-w-sm p-6  font-heading rounded-lg shadow-xl bg-white/10 backdrop-blur-md hover:shadow-lg transition-shadow duration-300 text-left animate-fadeIn"
              >
                <div className="flex flex-col items-left ">
                  <h5 className="mb-2 text-2xl font-semibold text-primary-50">
                    {session.module_name}
                  </h5>
                  <p className="mb-3 text-primary-300">
                    <span className="font-medium">Expiration:</span>{" "}
                    {new Date(session.expiration_date).toLocaleDateString()}
                  </p>
                  <p className="mb-3 text-primary-300">
                    <span className="font-medium">Catégorie:</span>{" "}
                    {session.categorie}
                  </p>
                </div>
                <div className="flex flex-col gap-3 h-72 overflow-auto">
                  {session.musics.map((music, idx) => (
                    <div
                      key={idx}
                      className="text-primary-50 rounded-lg bg-primary-800 flex justify-between items-center p-2 hover:bg-primary-800/50 transition-colors duration-300"
                    >
                      <div className="flex-1">
                        {music.title} - {music.artist}
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleVote(music._id, session._id)}
                          className="m-2 p-1 rounded transition-colors duration-300"
                        >
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            size="lg"
                            color={music.vote_count ? "green" : "white"}
                          />
                        </button>
                        <div className="m-2">{music.vote_count}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // Ne rien afficher si la session est expirée et que ce n'est pas le jour des résultats
          return null;
        })}
      </div>
    </div>
  );
};

export default ShowSession;

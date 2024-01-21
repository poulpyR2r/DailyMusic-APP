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
const ShowSession = () => {
  const [sessions, setSessions] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userVotes, setUserVotes] = useState({});
  console.log("userVotes", userVotes);
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

  const isSessionExpired = (expirationDate) => {
    const currentDate = new Date();
    const expiration = new Date(expirationDate);
    const dayAfterExpiration = new Date(expirationDate);
    dayAfterExpiration.setDate(expiration.getDate() + 2);
    return currentDate >= dayAfterExpiration;
  };

  const isResultDay = (expirationDate) => {
    // Utilisez une date fixe pour simuler le "currentDate"
    const simulatedCurrentDate = new Date("2024-12-12");

    // Assurez-vous que la date d'expiration est convertie en objet Date
    const expiration = new Date(expirationDate);

    // Calculez le "nextDay" comme étant le jour après la date d'expiration
    const nextDay = new Date(expiration);
    nextDay.setDate(expiration.getDate() + 1);

    // Affichez les dates pour le débogage
    console.log("Simulated Current Date:", simulatedCurrentDate);
    console.log("Expiration Date:", expiration);
    console.log("Next Day:", nextDay);

    // Vérifiez si la date simulée est entre la date d'expiration et le jour suivant
    if (simulatedCurrentDate > expiration && simulatedCurrentDate < nextDay) {
      console.log("Result day++++++++++++++++++++++++++++++");
      return true;
    }
  };

  console.log(
    "sessions",
    isResultDay(
      "Mon Jan 22 2024 01:00:00 GMT+0100 (heure normale d’Europe centrale)"
    )
  );

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
    let votes = JSON.parse(localStorage.getItem("userVotes")) || {};

    if (votes[sessionId]) {
      Swal.fire({
        title: "Vous avez déjà voté",
        text: "Vous ne pouvez pas voter deux fois dans la même session",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await voteService.voteForMusic({ userId, musicId });
      if (response.status === 201) {
        let updatedVotes = { ...votes, [sessionId]: musicId };
        setUserVotes(updatedVotes);
        localStorage.setItem("userVotes", JSON.stringify(updatedVotes));
        fetchSessions();
      }
    } catch (error) {
      console.error("Erreur lors du vote:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sessions.map((session) =>
          isResultDay(session.expiration_date) ? (
            <CalculeRates sessionId={session._id} />
          ) : (
            <div
              key="{session._id}"
              className="max-w-sm p-6 border font-heading rounded-lg shadow-xl  bg-primary-100 hover:shadow-lg transition-shadow duration-300 text-left "
            >
              <div className="flex flex-col items-left ">
                <h5 className=" transparenteEffect mb-2 text-2xl font-semibold text-black font-sans">
                  {session.module_name}
                </h5>
                <p className="mb-3 text-gray-700">
                  <span className="font-medium">Expiration:</span>{" "}
                  {new Date(session.expiration_date).toLocaleDateString()}
                </p>
                <p className="mb-3 text-gray-700">
                  <span className="font-medium">Catégorie:</span>{" "}
                  {session.categorie}
                </p>
              </div>

              <div className="flex flex-col gap-3 h-72 overflow-auto">
                {session.musics.map((music, idx) => (
                  <div
                    key={idx}
                    className="text-gray-700 rounded-lg bg-secondary-200 flex justify-between items-center p-2 hover:bg-secondary-300 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      {music.title} - {music.artist}
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleVote(music._id, session._id)}
                        className="m-2 p-1 rounded  transition-colors duration-300"
                      >
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"
                            fill="none"
                            stroke={music.vote_count ? "green" : "#003f74"}
                            stroke-width="2"
                          />
                        </svg>
                      </button>
                      <div className="m-2">{music.vote_count}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShowSession;

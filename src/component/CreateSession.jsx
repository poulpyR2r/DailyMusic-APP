import React, { useState, useEffect } from "react";

import sessionServices from "../services/sessionServices";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthSpotify from "../Config/spotify/AuthSpotify";

const CreateSession = ({ token, userRole }) => {
  const [_sessionId, setSessionId] = useState("");
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const handleAddSession = () => {
    if (sessionStorage.getItem("authTokenSpotify") === null) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Veuillez vous connecter à Spotify",
        showCloseButton: true,
        confirmButtonText: "Se connecter",
      }).then((result) => {
        if (result.isConfirmed) {
          handleLoginSpotify();
        }
      });

      return;
    }
    Swal.fire({
      title: "Ajouter une session de vote",
      html: `<div id="sessionForm">
               <input type="text" id="module_name" class="swal2-input" placeholder="Nom de la session">
               <input type="text" id="categorie" class="swal2-input" placeholder="Catégorie">
               <input type="date" id="expiration_date" class="swal2-input">

             </div>`,
      focusConfirm: false,
      preConfirm: () => {
        if (sessionStorage.getItem("authTokenSpotify") === null) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Veuillez vous connecter à Spotify",
            showCloseButton: true,
            confirmButtonText: "Se connecter",
          }).then((result) => {
            if (result.isConfirmed) {
              handleLoginSpotify();
            }
          });

          return;
        }
        const module_name = document.getElementById("module_name").value;
        let expiration_date = document.getElementById("expiration_date").value;
        let categorie = document.getElementById("categorie").value;

        if (!module_name || !expiration_date || !categorie) {
          Swal.showValidationMessage(`Veuillez remplir tous les champs`);
        }
        expiration_date = new Date(expiration_date).toISOString();
        return { module_name, expiration_date, categorie };
      },
      confirmButtonText: "Ajouter",
      showCancelButton: true,
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionServices
          .createSession(result.value)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Session ajoutée avec succès",
              showConfirmButton: false,
              timer: 1500,
            });
            handleGetSessions();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  const handleGetSessions = async () => {
    try {
      const response = await sessionServices.getAllSessions();
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data.votingSessions)
      ) {
        setSessions(response.data.data.votingSessions);
      } else {
        console.error(
          "Response does not contain an array of voting sessions:",
          response
        );
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      const response = await sessionServices.deleteSession(sessionId);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Session supprimée avec succès",
          showConfirmButton: false,
          timer: 1500,
        });
        handleGetSessions();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const isExpired = (expirationDate) => {
    // const simulatedCurrentDate = new Date("2024-07-01");
    const now = new Date();
    const expiration = new Date(expirationDate);
    return expiration < now;
  };

  useEffect(() => {
    handleGetSessions();
  }, []);

  const handleVoteMusic = (sessionId) => {
    navigate(`/vote-music/${sessionId}`);
  };

  const MySwal = withReactContent(Swal);
  const handleLoginSpotify = () => {
    AuthSpotify();
  };

  const handleAddMusic = (sessionId) => {
    if (sessionStorage.getItem("authTokenSpotify") === null) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Veuillez vous connecter à Spotify",
        showCloseButton: true,
        confirmButtonText: "Se connecter",
      }).then((result) => {
        if (result.isConfirmed) {
          handleLoginSpotify();
        }
      });

      return;
    }
    navigate(`/add-music/${sessionId}`);
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-4">
      {userRole && (
        <div className="bg-primary-500 p-8 rounded text-center shadow-xl mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ajouter une session
          </h2>
          <button
            className="bg-secondary-700 rounded text-white font-bold py-3 px-6  transition duration-300"
            onClick={handleAddSession}
          >
            Ajouter
          </button>
        </div>
      )}

      <div className="container px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sessions.map((session) => (
          <div
            key={session._id}
            className={`max-w-sm rounded-2xl overflow-hidden shadow-lg ${
              isExpired(session.expiration_date) ? "bg-gray-300" : "bg-white"
            } transform transition duration-300 hover:scale-105`}
          >
            <div className="px-6 py-4">
              <h5 className="transparenteEffect font-bold text-xl mb-2 text-gray-800">
                {session.module_name}
              </h5>
              <p className="text-gray-700 text-base">
                Expiration:{" "}
                {new Date(session.expiration_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-base">
                Catégorie: {session.categorie}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {userRole && (
                <button
                  onClick={() => handleDeleteSession(session._id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded mb-3 transition duration-300"
                >
                  Supprimer la session
                </button>
              )}
              <button
                onClick={() => handleAddMusic(session._id)}
                className={`w-full text-white font-medium py-2 px-4 rounded mb-3 transition duration-300 ${
                  isExpired(session.expiration_date)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Ajouter des musiques
              </button>
              <button
                className={`w-full text-white font-medium py-2 px-4 rounded transition duration-300 ${
                  isExpired(session.expiration_date)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={() => handleVoteMusic(session._id)}
              >
                Consulter la liste des musiques de la session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSession;

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

    const todayDate = new Date().toISOString().split("T")[0];
    Swal.fire({
      title: "Ajouter une session de vote",
      html: `<div id="sessionForm">
               <input type="text" id="module_name" class="swal2-input" placeholder="Nom de la session">
               <input type="text" id="categorie" class="swal2-input" placeholder="Catégorie">
               <input type="date" id="expiration_date" class="swal2-input" min="${todayDate}">

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
          .createSession(result.value, token)
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
    // const currentDate = new Date();
    const currentDate = new Date("2024-01-26T00:00:00"); // Pour la simulation

    const expiration = new Date(expirationDate);
    const twoDaysAfterExpiration = new Date(expiration);
    twoDaysAfterExpiration.setDate(expiration.getDate() + 2);

    return currentDate >= twoDaysAfterExpiration;
  };

  useEffect(() => {
    handleGetSessions();
  }, []);

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
    if (token.role === "user") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vous n'avez pas les droits pour ajouter des musiques",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    navigate(`/add-music/${sessionId}`);
  };

  return (
    <div className="">
      {userRole && (
        <div className="text-center mb-8 animate-fadeIn">
          <h2 className="text-4xl font-bold mb-4">Ajouter une session</h2>
          <button
            className="bg-primary-600 hover:bg-primary-700 rounded py-2 px-4 font-bold transition duration-300"
            onClick={handleAddSession}
          >
            Ajouter
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sessions.map((session) => (
          <div
            key={session._id}
            className={`animate-fadeIn rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-white/10 backdrop-blur-md p-4 ${
              isExpired(session.expiration_date) ? "opacity-50" : ""
            }`}
          >
            <div>
              <h5 className="font-bold text-xl mb-2">{session.module_name}</h5>
              <p>
                Expiration:{" "}
                {new Date(session.expiration_date).toLocaleDateString()}
              </p>
              <p>Catégorie: {session.categorie}</p>
            </div>
            <div className="mt-4">
              {userRole && (
                <button
                  onClick={() => handleDeleteSession(session._id)}
                  className="w-full bg-red-600 hover:bg-red-700 rounded py-2 mb-2 transition duration-300"
                >
                  Supprimer la session
                </button>
              )}
              <button
                onClick={() => handleAddMusic(session._id)}
                className={`w-full rounded py-2 mb-2 transition duration-300 ${
                  isExpired(session.expiration_date)
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Ajouter des musiques
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSession;

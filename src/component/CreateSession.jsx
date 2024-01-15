import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Use named import
import { decodeToken } from "../services/tokenService";
import sessionServices from "../services/sessionServices";
import Swal from "sweetalert2";

const CreateSession = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserRole(decodedToken.email);
      }
    }
  }, [token]);

  const handleAddSession = () => {
    Swal.fire({
      title: "Ajouter une session de vote",
      html: `<div id="sessionForm">
               <input type="text" id="module_name" class="swal2-input" placeholder="Nom de la session">
               <input type="date" id="expiration_date" class="swal2-input">

             </div>`,
      focusConfirm: false,
      preConfirm: () => {
        const module_name = document.getElementById("module_name").value;
        let expiration_date = document.getElementById("expiration_date").value;

        if (!module_name || !expiration_date) {
          Swal.showValidationMessage(`Veuillez remplir tous les champs`);
        }
        expiration_date = new Date(expiration_date).toISOString();
        return { module_name, expiration_date };
      },
      confirmButtonText: "Ajouter",
      showCancelButton: true,
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionServices
          .createSession(result.value)
          .then((response) => {
            console.log("response", response);
            Swal.fire({
              icon: "success",
              title: "Session ajoutée avec succès",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("error", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
        console.log("Données du formulaire:", result.value);
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

  useEffect(() => {
    handleGetSessions();
  }, [sessions]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-slate-600 p-8 rounded-2xl text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Ajouter une session
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddSession}
        >
          Ajouter
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sessions.map((session) => (
          <div
            key={session._id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
          >
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
              {session.module_name}
            </h5>
            <p className="mb-3 font-normal text-gray-500">
              {new Date(session.expiration_date).toLocaleDateString()}
            </p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded mb-2">
              Ajouter des musiques
            </button>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">
              Consulter la liste des musiques de la session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSession;

import React, { useState } from "react";
import axios from "axios";
import UserTracks from "./UserTracks";
import { useParams } from "react-router-dom";
import { decodeToken } from "../../services/tokenService";
import api from "../axiosApi";
import Swal from "sweetalert2";

const Search = ({ tokenSpotify }) => {
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [tracksSelected, setTracksSelected] = useState([]);
  const { sessionId } = useParams();

  const token = localStorage.getItem("token");
  const user = decodeToken(token);
  const userId = user.id;
  const tracksToSave = tracksSelected.map((track) => track.id);

  const saveSelectedTracks = async () => {
    try {
      const musicIds = await Promise.all(
        tracksSelected.map(async (track) => {
          const musicData = {
            title: track.name,
            artist: track.artists.map((artist) => artist.name).join(", "),
            music_id: track.id,
          };
          const response = await api.post("/music", musicData);
          return response.data.data.id;
        })
      );
      await updateVotingSession(musicIds);
    } catch (error) {
      console.error("Erreur lors de l’enregistrement des pistes:", error);
    }
  };

  const updateVotingSession = async (musicIds) => {
    try {
      await api.put(`/update-session/${sessionId}`, { musics: musicIds });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la session de vote:",
        error
      );
    }
  };

  const handleSaveTracks = () => {
    saveSelectedTracks();
    if (tracksSelected.length > 0) {
      Swal.fire({
        title: "Pistes enregistrées !",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }

    setTracksSelected([]);
  };

  const onSelectTrack = (track) => {
    if (
      !tracksSelected.some((selectedTrack) => selectedTrack.id === track.id)
    ) {
      setTracksSelected((prevTracks) => [...prevTracks, track]);
    }
  };

  const onRemoveTrack = (trackId) => {
    setTracksSelected((prevTracks) =>
      prevTracks.filter((track) => track.id !== trackId)
    );
  };

  const searchTracks = async () => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${tokenSpotify}`,
        },
        params: {
          q: searchKey,
          type: "track",
        },
      });
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Erreur lors de la recherche de pistes:", error);
      setTracks([]);
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <div className="flex justify-center mb-4 mt-2">
          <input
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-800 mr-2"
            placeholder="Rechercher des pistes"
          />
          <button
            onClick={searchTracks}
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
          >
            Rechercher
          </button>
        </div>

        <div className="">
          {tracksSelected.length > 0 && (
            <h3 className="text-lg font-semibold mb-4">
              Pistes sélectionnées:
            </h3>
          )}
          <div className="">
            {tracksSelected.map((track, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2 p-2 bg-white/10 backdrop-blur-md rounded"
              >
                <span>
                  {track.name} -{" "}
                  {track.artists.map((artist) => artist.name).join(", ")}
                </span>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                  onClick={() => onRemoveTrack(track.id)}
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-28">
            {tracksSelected.length > 0 && (
              <button
                onClick={handleSaveTracks}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Enregistrer les pistes sélectionnées
              </button>
            )}
          </div>
        </div>

        <div className=" justify-items-center grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white/10 backdrop-blur-md"
            >
              {track.album.images.length > 0 && (
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="w-full"
                />
              )}
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{track.name}</div>
                <p className="text-gray-300">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <button
                  className={`bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded ${
                    tracksSelected.some(
                      (selectedTrack) => selectedTrack.id === track.id
                    )
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  onClick={() => onSelectTrack(track)}
                  disabled={tracksSelected.some(
                    (selectedTrack) => selectedTrack.id === track.id
                  )}
                >
                  Ajouter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;

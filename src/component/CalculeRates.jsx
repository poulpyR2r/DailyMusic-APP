import React, { useState, useEffect } from "react";
import sessionServices from "../services/sessionServices";

const CalculeRates = ({ sessionId }) => {
  const [topMusics, setTopMusics] = useState([]);

  useEffect(() => {
    fetchTopMusics();
  }, [sessionId]);

  const fetchTopMusics = async () => {
    try {
      const response = await sessionServices.getMusicBySession(sessionId);
      let musicsWithVotes = response.data.musics.filter((music) => music.vote_count > 0);
  
      musicsWithVotes.sort((a, b) => b.vote_count - a.vote_count);
  
      let maxVotes = musicsWithVotes[0] ? musicsWithVotes[0].vote_count : 0;
      let podiumHeights = musicsWithVotes.map(music => 
        (music.vote_count / maxVotes) * 300 // 300px est la hauteur maximale
      );
  
      setTopMusics(musicsWithVotes.map((music, index) => ({
        ...music,
        height: podiumHeights[index]
      })));
    } catch (error) {
      console.error("Erreur lors de la récupération des musiques:", error);
    }
  };
  

  return (
    <div className="container podium">
    {topMusics[1] && (
      <div className="podium__item">
        <p className="podium__city">{topMusics[1].title} - {topMusics[1].artist}</p>
        <div className="podium__rank second">{topMusics[1].vote_count}</div>
      </div>
    )}
    {topMusics[0] && (
      <div className="podium__item">
        <p className="podium__city">{topMusics[0].title} - {topMusics[0].artist}</p>
        <div className="podium__rank first">{topMusics[0].vote_count}</div>
      </div>
    )}
    {topMusics[2] && (
      <div className="podium__item">
        <p className="podium__city">{topMusics[2].title} - {topMusics[2].artist}</p>
        <div className="podium__rank third">{topMusics[2].vote_count}</div>
      </div>
    )}
  </div>
  
  );
};

export default CalculeRates;

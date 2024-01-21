import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTracks = ({ tokenSpotify }) => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            'Authorization': `Bearer ${tokenSpotify}`
          }
        });
        setTopTracks(data.items);
      } catch (error) {
        console.error('Erreur lors de la récupération des meilleures pistes de l’utilisateur:', error);
      }
    };
    fetchTopTracks();
  }, [tokenSpotify]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-center">
      {topTracks.map((track, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4 mb-4">
          {track.album.images.length > 0 && (
            <img 
              src={track.album.images[0].url} 
              alt={track.name} 
              className="w-full object-cover h-48"
            />
          )}
          <div className="p-4">
            <div className="font-bold text-lg mb-2">{track.name}</div>
            <p className="text-gray-700 text-base">
              {track.artists.map(artist => artist.name).join(', ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTracks;

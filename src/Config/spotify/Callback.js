import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = new URLSearchParams(hash.substring(1)).get("access_token");

    if (token) {
      // Stockez le token pour une utilisation future
      sessionStorage.setItem("authTokenSpotify", token);
      // Redirigez vers une autre page après la connexion
      navigate("/create-sessions");
    }
  }, [navigate]);

  return <div>Connexion en cours...</div>;
};

export default Callback;

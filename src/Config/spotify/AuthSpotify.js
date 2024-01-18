const CLIENT_ID = "243a61be37604f379db41818e0cc37ea";
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = ["user-library-read", "user-top-read"];
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
  "%20"
)}&show_dialog=true`;

const AuthSpotify = () => {
  window.location = AUTH_URL;
  return null;
};

export default AuthSpotify;

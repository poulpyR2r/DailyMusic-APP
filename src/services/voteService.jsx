import api from "../Config/axiosApi";

const voteForMusic = ({ userId, musicId, sessionId }) => {
  return api
    .post("/vote", { userId, musicId, sessionId })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi du vote:", error);
      throw error;
    });
};

const getVotesByMusic = (musicId) => {
  return api
    .get(`/get-votes/${musicId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des votes:", error);
      throw error;
    });
};

export default { voteForMusic, getVotesByMusic };

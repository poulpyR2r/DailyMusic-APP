import api from "../Config/axiosApi";

const createSession = (data, token) => {
  return api
    .post("/create-session", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const getSessions = (sessionId) => {
  return api
    .get(`/get-informations/${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const getAllSessions = () => {
  return api
    .get(`/get-sessions`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const deleteSession = (sessionId) => {
  return api
    .delete(`/delete-session/${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const getMusicBySession = (sessionId) => {
  return api
    .get(`/get-musics/${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const deleteMusicFromSession = (sessionId, musicId) => {
  return api
    .delete(`/delete-music/${sessionId}/${musicId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export default {
  createSession,
  getSessions,
  getAllSessions,
  deleteSession,
  getMusicBySession,
  deleteMusicFromSession,
};

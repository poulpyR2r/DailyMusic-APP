import api from "../Config/axiosApi";

const createSession = (data) => {
  console.log("data", data);
  return api
    .post("/create-session", data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const getSessions = (sessionId) => {
  return api
    .get(`/get-sessions/${sessionId}`)
    .then((response) => {
      console.log(response);
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
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export default { createSession, getSessions, getAllSessions };

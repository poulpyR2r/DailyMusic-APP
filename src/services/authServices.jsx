import api from "../Config/axiosApi";

const login = (user) => {
  return api
    .post("/login", user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      return response;
    })
    .catch((error) => {
      console.error("Login Error:", error);
      throw error;
    });
};

const register = (user) => {
  return api.post("/register", user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};


export default { register, login };

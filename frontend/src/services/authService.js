import apiconnection from "../api/general";

const login = async (body) => {
    console.log(body);
  const response = await apiconnection.post(
    `/login`,
    body
  );
  return response.data;
};

const register = async (body) => {
    const response = await apiconnection.post(
        `/register`,
        body
    );
    return response.data;
};

const authService = {
    login,
    register
};

export default authService;

import apiconnection from "../api/general";

const savePreference = async (body) => {
  const response = await apiconnection.post(
    `/update_preference`,
    body
  );
  return response.data;
};

const getPreference = async (body) => {
    const response = await apiconnection.post(
        `/user_preference`,
        body
    );
    return response.data;
};


const preferenceService = {
    savePreference,
    getPreference
};

export default preferenceService;

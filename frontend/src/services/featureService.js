import apiconnection from "../api/general";

const getSources = async () => {
  const response = await apiconnection.get(`/sources`);
  return response.data;
};

const getCategories = async () => {
    const response = await apiconnection.get(`/categories`);
    return response.data;
};

const getAuthors= async () => {
    const response = await apiconnection.get(`/authors`);
    return response.data;
};

const featureService = {
    getSources,
    getCategories,
    getAuthors
};


export default featureService;

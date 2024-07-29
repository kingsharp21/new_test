import apiconnection from "../api/general";

const getUserPreferenceFeed = async (body) => {
  const response = await apiconnection.post(
    `/preference`,
    body
  );
  return response.data;
};

const search = async (body) => {
    const response = await apiconnection.post(
        `/search`,
        body
    );
    return response.data;
};

const feedService = {
    getUserPreferenceFeed,
    search
};

export default feedService;

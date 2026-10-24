import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}/user`;

export const toggleBookmark = async (questionId) => {
  try {
    const result = await axios.patch(
      `${URL}/${questionId}/bookmark`,
      {},
      { withCredentials: true },
    );
    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const getBookmarks = async () => {
  try {
    const result = await axios.get(`${URL}/bookmarks`, {
      withCredentials: true,
    });

    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
export const updateProfile = async (formData) => {
  try {
    const result = await axios.patch(`${URL}/update-profile`, formData, {
      withCredentials: true,
    });
    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const getUserQuestions = async (page = 1) => {
  try {
    const result = await axios.get(`${URL}/my-questions`, {
      params: { page },
      withCredentials: true,
    });
    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const getUserAnswers = async (page = 1) => {
  try {
    const result = await axios.get(`${URL}/my-answers`, {
      params: { page },
      withCredentials: true,
    });
    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

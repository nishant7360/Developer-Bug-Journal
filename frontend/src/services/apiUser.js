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

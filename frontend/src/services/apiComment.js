import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}/comment`;

export const getComments = async (questionId) => {
  try {
    const result = await axios.get(`${URL}/${questionId}`, {
      withCredentials: true,
    });

    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const createComment = async ({ questionId, content }) => {
  try {
    const result = await axios.post(
      `${URL}/${questionId}`,
      { content },
      { withCredentials: true },
    );

    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const updateComment = async ({ commentId, content }) => {
  try {
    const result = await axios.patch(
      `${URL}/${commentId}`,
      { content },
      { withCredentials: true },
    );

    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const result = await axios.delete(`${URL}/${commentId}`, {
      withCredentials: true,
    });
    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

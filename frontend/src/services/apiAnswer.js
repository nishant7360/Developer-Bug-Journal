import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}/answer`;

export const getAnswersByQuestion = async (questionId) => {
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

export const createAnswer = async ({ questionId, content }) => {
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

export const acceptAnswer = async (questionId) => {
  try {
    const result = await axios.patch(`${URL}/${questionId}`, {
      withCredentials: true,
    });

    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}/question`;

export const getAllQuestions = async (query = "") => {
  try {
    const result = await axios.get(`${URL}${query ? `?${query}` : ""}`, {
      withCredentials: true,
    });
    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const getQuestionById = async (id) => {
  try {
    const result = await axios.get(`${URL}/${id}`);

    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

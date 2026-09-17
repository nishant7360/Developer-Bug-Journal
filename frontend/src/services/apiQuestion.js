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

export const createQuestion = async (formData) => {
  try {
    const result = await axios.post(URL, formData, {
      withCredentials: true,
    });
    return result.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateQuestion = async (id, formData) => {
  try {
    const result = await axios.patch(`${URL}/${id}`, formData, {
      withCredentials: true,
    });
    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
export const deleteQuestion = async (id) => {
  try {
    const result = await axios.delete(`${URL}/${id}`, {
      withCredentials: true,
    });

    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

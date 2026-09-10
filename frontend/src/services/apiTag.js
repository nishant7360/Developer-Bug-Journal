import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}/tags`;

export const getAllTags = async () => {
  try {
    const result = await axios.get(URL);
    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

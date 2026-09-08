import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}/auth`;

export const registerUser = async ({ username, email, password }) => {
  try {
    const result = await axios.post(
      `${URL}/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );
    return result.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

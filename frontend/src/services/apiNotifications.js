import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}/notification`;

export const getNotifications = async () => {
  try {
    const response = await axios.get(URL, { withCredentials: true });
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const getUnreadCount = async () => {
  try {
    const response = await axios.get(`${URL}/unread-count`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const markAllRead = async () => {
  try {
    const response = await axios.patch(
      `${URL}/read-all`,
      {},
      { withCredentials: true },
    );
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

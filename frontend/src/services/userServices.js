import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://edu-stream-backend-delta.vercel.app/user",
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const getUser = async (userId) => {
  setAuthHeaders();
  try {
    const res = await apiClient.get(`/get_user/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async () => {
  setAuthHeaders();
  try {
    const res = await apiClient.get(`/get_all_users`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (id) => {
  setAuthHeaders();
  try {
    await apiClient.delete(`/delete_user/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};

export const editUser = async (id, aboutMe) => {
  setAuthHeaders();
  try {
    const res = await apiClient.put(`/edit_user/${id}`, { aboutme: aboutMe });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

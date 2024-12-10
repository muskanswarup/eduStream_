import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/tag",
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

export const getTags = async () => {
  setAuthHeaders();
  try {
    const res = await apiClient.get(`/get_tags`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

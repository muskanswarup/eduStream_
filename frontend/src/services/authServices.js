import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://edu-stream-backend-delta.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = (response) => response.data;

export const login = async (email, password) => {
  try {
    const res = await apiClient.post("/login", { email, password });
    return handleResponse(res);
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (name, email, password, role) => {
  try {
    const res = await apiClient.post("/signup", {
      name,
      email,
      password,
      role,
    });
    return handleResponse(res);
  } catch (error) {
    throw error.response.data;
  }
};

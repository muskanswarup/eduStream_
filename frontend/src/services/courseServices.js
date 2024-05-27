import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://edu-stream-backend-delta.vercel.app/course",
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

export const getCourses = async () => {
  setAuthHeaders();
  try {
    const res = await apiClient.get("/get_courses");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createCourse = async (courseData) => {
  setAuthHeaders();
  try {
    const res = await apiClient.post("/create_course", courseData);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const enrollCourse = async (courseId) => {
  setAuthHeaders();
  try {
    await apiClient.put(`/enroll_course/${courseId}`, {});
  } catch (error) {
    throw error.response.data;
  }
};

export const completeCourse = async (courseId) => {
  setAuthHeaders();
  try {
    await apiClient.put(`/complete_course/${courseId}`, {});
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCourse = async (courseId) => {
  setAuthHeaders();
  try {
    await apiClient.delete(`/delete_course/${courseId}`);
  } catch (error) {
    throw error.response.data;
  }
};

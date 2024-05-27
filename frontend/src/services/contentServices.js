import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://edu-stream-backend-delta.vercel.app/content",
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

export const addContent = async (contentURL, contentTitle, courseId) => {
  setAuthHeaders();
  try {
    let embedUrl = null;

    if (
      contentURL.match(
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
      )
    ) {
      const videoId = contentURL.match(
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
      )[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else {
      throw new Error("Invalid URL");
    }

    const data = {
      title: contentTitle,
      url: embedUrl,
    };

    const response = await apiClient.post(`/add_content/${courseId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContent = async (id) => {
  setAuthHeaders();
  try {
    await apiClient.delete(`/delete_content/${id}`);
  } catch (error) {
    throw error;
  }
};

export const markContentAsWatched = async (id) => {
  setAuthHeaders();
  try {
    await apiClient.put(`/watched_content/${id}`, {});
  } catch (error) {
    throw error;
  }
};

import { useState } from "react";
import { addContent } from "../services/contentServices";

const useAddContentForm = (courseId, setRender) => {
  const [contentTitle, setContentTitle] = useState("");
  const [contentURL, setContentURL] = useState("");
  const [showAddContent, setShowAddContent] = useState(false);

  const handleContentTitleChange = (e) => setContentTitle(e.target.value);
  const handleContentURLChange = (e) => setContentURL(e.target.value);
  const handleToggleAddContent = () => setShowAddContent(!showAddContent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContent(contentURL, contentTitle, courseId);
      setRender((prevRender) => !prevRender);
    } catch (error) {
      console.log(error);
    }
    setContentTitle("");
    setContentURL("");
    setShowAddContent(false);
  };

  return {
    contentTitle,
    contentURL,
    showAddContent,
    handleContentTitleChange,
    handleContentURLChange,
    handleToggleAddContent,
    handleSubmit,
  };
};

export default useAddContentForm;

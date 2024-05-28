import { useSelector } from "react-redux";
import DeleteIcon from "../../../utils/icons/DeleteIcon";
import EyeIcon from "../../../utils/icons/WatchedIcon";
import TickIcon from "../../../utils/icons/TickIcon";
import {
  deleteContent,
  markContentAsWatched,
} from "../../../services/contentServices";
import axios from "axios";

export default function CourseCourseCard({
  content,
  setRender,
  courseData,
  courseId,
  userData
}) {
  const { currentUser } = useSelector((state) => state.user);

  const handleDeleteContent = async (id) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.delete(`https://edu-stream-backend-delta.vercel.app/content/delete_content/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      setRender((prevRender) => !prevRender);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatchedContent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.put(
        `https://edu-stream-backend-delta.vercel.app/content/watched_content/${id}`,
        {},
        {
          method: "PUT",
          headers: headers,
        }
      );
      setRender((prevRender) => !prevRender);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(courseData);
  console.log(userData);
  return (
    <div
      key={content._id}
      className="cursor-pointer flex flex-col sm:m-4 gap-1 "
    >
      <iframe
        className="object-cover rounded-md hover:opacity-90 h-60 w-full"
        title={content.title}
        src={content.url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-md">{content.title}</h3>
        {currentUser.role === "instructor" && userData.owned_courses.find((course) => course._id === courseId) && (
          <div className=" group relative">
            <DeleteIcon
              className="text-red-700"
              onClick={() => handleDeleteContent(content._id)}
            />
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Delete
            </div>
          </div>
        )}
        {currentUser.role === "admin" && (
          <div className=" group relative">
            <DeleteIcon
              className="text-red-700"
              onClick={() => handleDeleteContent(content._id)}
            />
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Delete
            </div>
          </div>
        )}
        {!content.watchedBy.includes(currentUser._id) &&
          currentUser.role === "enduser" &&
          courseData
            ?.find((course) => course._id === courseId)
            ?.enrolled_users?.find((user) => user === currentUser._id) && (
            <div className=" group relative">
              <EyeIcon
                className="text-yellow-700"
                onClick={() => handleWatchedContent(content._id)}
              />
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click To Complete
              </div>
            </div>
          )}
        {content.watchedBy.includes(currentUser._id) &&
          currentUser.role === "enduser" && (
            <div className=" group relative">
              <TickIcon className="text-green-700" />
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Watched
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

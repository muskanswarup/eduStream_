import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteIcon from "../../../utils/icons/DeleteIcon";
import axios from "axios";

export default function MyCoursesCourseCard({
  id,
  title,
  description,
  instructorName,
  avatar,
  userData,
  setRender,
}) {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const handleCourseClick = (courseId) => {
    navigate(`/${courseId}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.delete(`https://edu-stream-backend-delta.vercel.app/course/delete_course/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      setRender((prevRender) => !prevRender);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={id}
      onClick={() => handleCourseClick(id)}
      className="cursor-pointer flex flex-col sm:m-4 gap-2 "
    >
      <img
        src={`/${avatar}`}
        alt="course-display"
        className="object-cover rounded-md hover:opacity-90 h-full w-full"
      />

      <div className="flex flex-col gap-2">
        <div className="">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg text-left">{title}</h3>
            {currentUser.role === "instructor" && (
              <div className=" group relative">
                <DeleteIcon
                  className="text-red-700"
                  onClick={(e) => handleDelete(e)}
                />
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Delete
                </div>
              </div>
            )}
          </div>
          <p className="line-clamp-3 text-xs text-left">{description}</p>
        </div>
        <h3
          className={`text-sm text-left font-semibold ${
            instructorName === currentUser.name
              ? "text-green-700"
              : "text-purple-700"
          }`}
        >
          {instructorName === currentUser.name ? "me" : instructorName}
        </h3>
      </div>
    </div>
  );
}

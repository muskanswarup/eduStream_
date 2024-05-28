import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../../utils/icons/DeleteIcon";
import { deleteCourse } from "../../../services/courseServices";
import axios from "axios";

export default function ManageCoursesCourseCard({ course, render, setRender }) {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const handleCourseClick = (courseId) => {
    navigate(`/${courseId}`);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    handleDeleteCourse();
  };

  const handleDeleteCourse = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.delete(
        `https://edu-stream-backend-delta.vercel.app/course/delete_course/${course._id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={course._id}
      onClick={() => handleCourseClick(course._id)}
      className="cursor-pointer flex flex-col sm:m-4 gap-2 "
    >
      <img
        src={`/${course.avatar}`}
        alt="course-display"
        className="object-cover rounded-md hover:opacity-90 h-full w-full"
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start ">
          <h3 className="font-semibold text-lg">{course.title}</h3>
          {currentUser.role === "admin" && (
            <div className=" group relative">
              <DeleteIcon className="text-red-700" onClick={handleClick} />
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Delete
              </div>
            </div>
          )}
        </div>
        <p className="line-clamp-3 text-sm">{course.description}</p>

        <h3 className="text-sm text-purple-700">{course.instructor.name}</h3>
        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <button
              key={tag._id}
              className="inline-flex items-center rounded-[4px] border px-2.5 py-0.5 text-xs font-semibold bg-purple-700 text-white"
            >
              {tag.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

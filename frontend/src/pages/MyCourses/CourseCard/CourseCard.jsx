import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CourseCard({ id, title, description, instructorName }) {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const handleCourseClick = (courseId) => {
    navigate(`/${courseId}`);
  };

  return (
    <div
      key={id}
      onClick={() => handleCourseClick(id)}
      className="cursor-pointer flex flex-col sm:m-4 gap-2 "
    >
      <img
        src="/cutepfp.jpg"
        alt="course-display"
        className="object-cover rounded-md hover:opacity-90 h-full w-full"
      />

      <div className="flex flex-col gap-2">
        <div className="">
          <h3 className="font-semibold text-lg text-left">{title}</h3>
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

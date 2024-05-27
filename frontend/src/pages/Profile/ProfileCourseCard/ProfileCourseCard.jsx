import { useNavigate } from "react-router-dom";

export default function ProfileCourseCard({ course }) {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/${courseId}`);
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
        <div className="">
          <h3 className="font-semibold text-lg text-left">{course.title}</h3>
          <p className="line-clamp-3 text-xs text-left">{course.description}</p>
        </div>
        <div className="flex items-center justify-between ">
          <h1 className="text-sm text-purple-700 font-semibold">
            No. Of Content
          </h1>
          {course.course_content?.length}
        </div>
      </div>
    </div>
  );
}

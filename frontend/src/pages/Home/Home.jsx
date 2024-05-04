import CourseCard from "./CourseCard.jsx/CourseCard";

export default function Home({ courseData, userData }) {
  return (
    <div className="m-4 flex flex-col gap-2">
      <h2 className="font-semibold text-lg mx-4 uppercase">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
        {courseData.length > 0 &&
          courseData.map((course) => (
            <CourseCard key={course._id} userData={userData} course={course} />
          ))}
      </div>
    </div>
  );
}

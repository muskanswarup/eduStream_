import HomeCourseCard from "./HomeCourseCard.jsx/HomeCourseCard";

export default function Home({ courseData, userData }) {
  return (
    <div className="flex-1 m-2 sm:m-4 flex flex-col gap-2">
      <h2 className="flex items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9">All Courses</h2>
      {courseData.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
          {courseData.map((course) => (
            <HomeCourseCard key={course._id} userData={userData} course={course} />
          ))}
        </div>
      ) : (
        <div className=" text-lg mx-4 text-red-700">
          There are no Courses available yet
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          "http://localhost:3000/course/get_courses",
          {
            method: "GET",
            headers: headers,
          }
        );
        const data = res.data;
        setCourseData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/${courseId}`);
  };

  return (
    <div className="m-4 flex flex-col gap-4">
      <h2 className="text-3xl font-semibold mx-4">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
        {courseData.length > 0 &&
          courseData.map((course) => (
            <div
              key={course._id}
              onClick={() => handleCourseClick(course._id)}
              className="cursor-pointer flex flex-col m-4 gap-2 "
            >
              <img
                src="/cutepfp.jpg"
                alt="course-display"
                className="object-cover rounded-md hover:opacity-90 h-full w-full"
              />
              <div className="flex flex-col gap-2">
                <div className="">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="line-clamp-3 text-sm">{course.description}</p>
                </div>
                <h3 className="text-sm">{course.instructor.name}</h3>
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
          ))}
      </div>
    </div>
  );
}

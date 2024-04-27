import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [courseData, setCourseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

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

  const backToCourses = () => {
    setSelectedCourse(null);
  };

  const handleCourseClick = (courseId) => {
    if (selectedCourse === courseId) {
      setSelectedCourse(null);
    } else {
      setSelectedCourse(courseId);
    }
  };

  return (
    <div>
      {selectedCourse ? (
        <div className="col-span-4">
          <h2 className="text-3xl font-bold">Course Content</h2>
          <button
            className="px-2 py-0.5 bg-[--ac-light] text-[--ac-fg] rounded-md mt-2"
            onClick={backToCourses}
          >
            (Go Back to Courses)
          </button>
          <div className="grid grid-cols-4 gap-8 mt-4">
            {courseData
              .find((course) => course._id === selectedCourse)
              ?.course_content.map((content) => (
                <div key={content._id} className="h-52 rounded-lg">
                  <iframe
                    className="object-cover h-full w-full rounded-lg"
                    title={content.title}
                    width="560"
                    height="315"
                    src={content.url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold">All Courses</h2>
          <div className="grid grid-cols-4 gap-8 mt-8 items-start">
            {courseData.length > 0 && courseData.map((course) => (
              <button
                key={course._id}
                onClick={() => handleCourseClick(course._id)}
              >
                <div className="rounded-lg bg-gray-300 p-4">
                  <div className="h-64 w-full rounded-lg bg-gray-800">
                    <img
                      src="https://d15cw65ipctsrr.cloudfront.net/14/4dcbc397754fb880094f4ebde1fdb5/Java-Full-Stack-Developer-specialization-2-.png"
                      alt="course-display"
                      className="object-cover h-full w-full rounded-lg"
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className="mt-2 text-left">
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <p className="line-clamp-3 text-sm">{course.description}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-left">
                      {course.instructor}
                    </h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <button
                        key={index}
                        className="bg-gray-500 text-white px-2 py-1 rounded-md text-sm"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

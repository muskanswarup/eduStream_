import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [courseData, setCourseData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);

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
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get("http://localhost:3000/tag/get_tags", {
          method: "GET",
          headers: headers,
        });
        const data = res.data;
        setTagsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
    fetchTags();
  }, []);

  const handleTagClick = (tagId) => {
    if (selectedTag.includes(tagId)) {
      setSelectedTag(selectedTag.filter((item) => item !== tagId));
    } else {
      setSelectedTag([...selectedTag, tagId]);
    }
  };
  return (
    <div className="">
      <h2 className="text-3xl font-bold">Categories</h2>
      <div className="flex mt-4">
        {tagsData.map((tag) => (
          <button
            key={tag._id}
            onClick={() => handleTagClick(tag._id)}
            className={`mr-4 px-4 py-2 rounded-md ${
              selectedTag.includes(tag._id)
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {tag.title}
          </button>
        ))}
      </div>
      <h2 className="text-3xl font-bold mt-8">Courses</h2>
      {selectedTag.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 items-start">
          {courseData
            .filter((course) =>
              selectedTag.some((tag) => course.tags.includes(tag))
            )
            .map((course) => (
              <button key={course._id}>
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
                    <h3 className="text-sm text-left">{course.instructor}</h3>
                  </div>
                </div>
              </button>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 items-start">
          {courseData.length > 0 &&
            courseData.map((course) => (
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
                    <h3 className="text-left text-sm">{course.instructor}</h3>
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
      )}
    </div>
  );
}

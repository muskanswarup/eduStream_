import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [courseData, setCourseData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
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

  const handleCourseClick = (courseId) => {
    navigate(`/${courseId}`);
  };

  return (
    <div className="m-4 flex flex-col gap-4">
      <h2 className="text-3xl font-semibold mx-4">Categories</h2>
      <div className="flex">
        {tagsData.map((tag) => (
          <button
            key={tag._id}
            onClick={() => handleTagClick(tag._id)}
            className={`mx-4 px-3 py-1 rounded-sm text-sm ${
              selectedTag.includes(tag._id)
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tag.title}
          </button>
        ))}
      </div>
      <h2 className="text-3xl font-semibold mx-4">Courses</h2>
      {selectedTag.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
          {courseData
            .filter((course) =>
              selectedTag.some((tag) =>
                course.tags.map((tag) => tag._id).includes(tag)
              )
            )
            .map((course) => (
              <button
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
                    <h3 className="font-semibold text-lg text-left">
                      {course.title}
                    </h3>
                    <p className="line-clamp-3 text-sm text-left">
                      {course.description}
                    </p>
                  </div>
                  <h3 className="text-sm text-left">
                    {course.instructor.name}
                  </h3>
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
              </button>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
          {courseData.length > 0 &&
            courseData.map((course) => (
              <button
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
                    <h3 className="font-semibold text-lg text-left">
                      {course.title}
                    </h3>
                    <p className="line-clamp-3 text-sm text-left">
                      {course.description}
                    </p>
                  </div>
                  <h3 className="text-sm text-left">
                    {course.instructor.name}
                  </h3>
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
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

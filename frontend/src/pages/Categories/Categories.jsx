import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard.jsx/CourseCard";

export default function Categories({ courseData, userData }) {
  const [tagsData, setTagsData] = useState([]);

  const [selectedTag, setSelectedTag] = useState([]);

  useEffect(() => {
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
    <div className="m-4 flex flex-col gap-2">
      <h2 className="font-semibold text-lg mx-4 uppercase">Categories</h2>
      <div className="flex">
        {tagsData ? (
          tagsData.map((tag) => (
            <button
              key={tag._id}
              onClick={() => handleTagClick(tag._id)}
              className={`mx-2 px-3 py-1 rounded-sm text-sm ${
                selectedTag.includes(tag._id)
                  ? "bg-purple-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tag.title}
            </button>
          ))
        ) : (
          <div className=" text-lg mx-4 text-red-700">
            There are no Tags yet
          </div>
        )}
      </div>
      <h2 className="font-semibold text-lg mx-4 uppercase mt-2">Courses</h2>
      {selectedTag.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
          {courseData
            .filter((course) =>
              selectedTag.some((tag) =>
                course.tags.map((tag) => tag._id).includes(tag)
              )
            )
            .map((course) => (
              <CourseCard
                key={course._id}
                userData={userData}
                course={course}
              />
            ))}
        </div>
      ) : courseData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
          {courseData.map((course) => (
            <CourseCard key={course._id} userData={userData} course={course} />
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

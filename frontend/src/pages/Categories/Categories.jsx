import React, { useEffect, useState } from "react";
import CategoriesCourseCard from "./CategoriesCourseCard/CategoriesCourseCard";
import { getTags } from "../../services/tagServices";
import axios from "axios";

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
        const res = await axios.get("https://edu-stream-backend-delta.vercel.app/tag/get_tags", {
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
    <div className="flex-1 m-2 sm:m-4 flex flex-col gap-2">
      <h2 className="flex items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9">Categories</h2>
      <div className="flex flex-wrap">
        {tagsData ? (
          tagsData.map((tag) => (
            <button
              key={tag._id}
              onClick={() => handleTagClick(tag._id)}
              className={`mx-1 sm:mx-2 px-3 my-1 py-1 rounded-sm text-sm ${
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
      {selectedTag.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
          {courseData
            .filter((course) =>
              selectedTag.some((tag) =>
                course.tags.map((tag) => tag._id).includes(tag)
              )
            )
            .map((course) => (
              <CategoriesCourseCard
                key={course._id}
                userData={userData}
                course={course}
              />
            ))}
        </div>
      ) : courseData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
          {courseData.map((course) => (
            <CategoriesCourseCard key={course._id} userData={userData} course={course} />
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

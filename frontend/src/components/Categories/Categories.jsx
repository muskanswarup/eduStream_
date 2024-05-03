import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TickIcon from "./Icons/TickIcon";
import PendingIcon from "./Icons/PendingIcon";

export default function Categories() {
  const [courseData, setCourseData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [selectedTag, setSelectedTag] = useState([]);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

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
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `http://localhost:3000/user/get_user/${currentUser._id}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        const data = res.data;
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
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
    <div className="m-4 flex flex-col gap-2">
      <h2 className="font-semibold text-lg mx-4 uppercase">Categories</h2>
      <div className="flex">
        {tagsData.map((tag) => (
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
        ))}
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
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-left">
                        {course.title}
                      </h3>
                      {userData?.completed_courses
                        ?.map((course) => course._id)
                        .includes(course._id) && (
                        <div className=" group relative">
                          <TickIcon className="text-green-700" />
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Watched
                          </div>
                        </div>
                      )}
                      {userData?.enrolled_courses
                        ?.map((course) => course._id)
                        .includes(course._id) && (
                        <div className=" group relative">
                          <PendingIcon className="text-yellow-700" />
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Pending
                          </div>
                        </div>
                      )}
                    </div>
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
              </div>
            ))}
        </div>
      ) : (
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
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">
                        {course.title}
                      </h3>
                      {userData?.completed_courses
                        ?.map((course) => course._id)
                        .includes(course._id) && (
                        <div className=" group relative">
                          <TickIcon className="text-green-700" />
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Watched
                          </div>
                        </div>
                      )}
                      {userData?.enrolled_courses
                        ?.map((course) => course._id)
                        .includes(course._id) && (
                        <div className=" group relative">
                          <PendingIcon className="text-yellow-700" />
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Pending
                          </div>
                        </div>
                      )}
                    </div>
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
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

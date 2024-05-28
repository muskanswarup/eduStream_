import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyCoursesCourseCard from "./MyCoursesCourseCard/MyCoursesCourseCard";
import UpArrow from "../../utils/icons/UpArrow";
import DownArrow from "../../utils/icons/DownArrow";
import { createCourse } from "../../services/courseServices";
import axios from "axios";

export default function MyCourses({ courseData, userData, setRender }) {
  const { currentUser } = useSelector((state) => state.user);

  const [showAddCourse, setShowAddCourse] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState([]);

  const [completedCourses, setCompletedCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [ownedCourses, setOwnedCourses] = useState([]);

  const [showCompletedCourses, setShowCompletedCourses] = useState(true);
  const [showPendingCourses, setShowPendingCourses] = useState(true);
  const [showOwnedEnrolledCourses, setShowOwnedEnrolledCourses] =
    useState(true);

  useEffect(() => {
    if (userData && courseData) {
      setCompletedCourses(
        userData?.completed_courses?.map((completedCourse) => {
          return courseData.find(
            (course) => course._id === completedCourse._id
          );
        })
      );
      setEnrolledCourses(
        userData?.enrolled_courses?.map((enrolledCourse) => {
          return courseData.find((course) => course._id === enrolledCourse._id);
        })
      );
      setOwnedCourses(
        userData?.owned_courses?.map((ownedCourse) => {
          return courseData.find((course) => course._id === ownedCourse._id);
        })
      );
    }
  }, [userData, courseData]);

  const pendingCoursesInstructor = ownedCourses
    ? ownedCourses.filter((ownedCourse) => {
        return !userData.completed_courses.some(
          (completedCourse) => completedCourse._id === ownedCourse._id
        );
      })
    : [];

  const handleTagChange = (e) => {
    setTags(e.target.value);
  };

  const handleTagAdd = () => {
    if (tags.trim() !== "") {
      setTagList([...tagList, tags.trim()]);
      setTags("");
    }
  };

  const handleTagRemove = (tagIndex) => {
    setTagList(tagList.filter((tag, index) => index !== tagIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: courseName,
      description: courseDescription,
      instructor: currentUser._id,
      tags: tagList,
    };
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.post(
        "https://edu-stream-backend-delta.vercel.app/course/create_course",
        data,
        {
          method: "POST",
          headers: headers,
        }
      );
      setRender((prevRender) => !prevRender);
      setShowAddCourse(false)
    } catch (error) {
      console.log(error);
    }
    setCourseName("");
    setCourseDescription("");
    setTags("");
    setTagList([]);
  };


  return (
    <div className="flex-1 m-2 sm:m-4">
      {currentUser.role === "instructor" && (
        <>
          <button
            onClick={() => setShowAddCourse(!showAddCourse)}
            className="border hover:bg-purple-700 rounded-lg hover:text-white font-semibold bg-gray-100 border-gray-300 md:rounded-[4px] text-sm px-3 shadow-sm h-9 w-full mb-2"
          >
            {showAddCourse ? "Go Back" : "Create Course"}
          </button>
          {showAddCourse && (
            <div className="flex justify-center mt-4">
              <form
                className="p-4 flex flex-col gap-2  w-96 border bg-gray-100 rounded-lg border-gray-300"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-1">
                  <h1 className="font-semibold ">Course Name</h1>
                  <div className="border bg-gray-100 border-gray-300 md:rounded-[4px] lg:flex items-center gap-2 text-sm px-3 py-1 shadow-sm h-9 hidden ">
                    <input
                      type="text"
                      id="courseName"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      required
                      placeholder="Course Name"
                      className="bg-gray-100 focus:outline-none hidden md:block"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-semibold ">Course Description</h1>
                  <div className="border bg-gray-100 border-gray-300 md:rounded-[4px] lg:flex items-center gap-2 text-sm px-3 py-1 shadow-sm h-9 hidden ">
                    <input
                      type="text"
                      id="courseDescription"
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      required
                      placeholder="Course Description"
                      className="bg-gray-100 focus:outline-none hidden md:block"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-semibold ">Tags</h1>
                  <div className="flex justify-between">
                    <div className="border bg-gray-100 border-gray-300 md:rounded-[4px] lg:flex items-center gap-2 text-sm px-3 py-1 shadow-sm h-9 hidden ">
                      <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={handleTagChange}
                        placeholder="Enter tags 1 by 1"
                        className="bg-gray-100 focus:outline-none hidden md:block"
                      ></input>
                    </div>
                    <button
                      className="border hover:bg-purple-700 rounded-lg hover:text-white font-semibold bg-gray-100 border-gray-300 md:rounded-[4px] text-sm px-3 shadow-sm h-9"
                      onClick={handleTagAdd}
                      type="button"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
                {tagList.length > 0 && (
                  <div>
                    <h1 className="font-semibold ">Selected Tags</h1>
                    <ul>
                      {tagList.map((tag, index) => (
                        <li
                          key={index}
                          className="inline-flex items-center rounded-[4px] border px-2.5 py-0.5 text-xs font-semibold bg-purple-700 text-white hover:bg-opacity-80 hover:cursor-pointer gap-2"
                          onClick={() => handleTagRemove(index)}
                        >
                          <span className="">{tag}</span>
                          <h1 className="font-semibold text-black items-center">
                            x
                          </h1>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  className="border hover:bg-purple-700 rounded-lg hover:text-white font-semibold bg-gray-100 border-gray-300 md:rounded-[4px] text-sm px-3 shadow-sm h-9"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </>
      )}
      {!showAddCourse && (
        <>
          {completedCourses?.length > 0 && (
            <>
              <h2
                onClick={() => setShowCompletedCourses(!showCompletedCourses)}
                className="group flex items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9 w-full mb-2 hover:bg-gray-50 hover:cursor-pointer"
              >
                <span className="group-hover:text-purple-700">
                  Completed Courses
                </span>
                {showCompletedCourses ? (
                  <UpArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                ) : (
                  <DownArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                )}
              </h2>
              {showCompletedCourses && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
                  {completedCourses.map((course) => (
                    <MyCoursesCourseCard
                      key={course?._id}
                      id={course?._id}
                      title={course?.title}
                      description={course?.description}
                      instructorName={course?.instructor.name}
                      avatar={course.avatar}
                      userData={userData}
                      setRender={setRender}

                    />
                  ))}
                </div>
              )}
            </>
          )}

          {currentUser.role === "instructor" &&
            pendingCoursesInstructor?.length > 0 && (
              <>
                <h2
                  onClick={() => setShowPendingCourses(!showPendingCourses)}
                  className="group flex items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9 w-full mb-2 hover:bg-gray-50 hover:cursor-pointer"
                >
                  <span className="group-hover:text-purple-700">
                    Pending Courses
                  </span>
                  {showPendingCourses ? (
                    <UpArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                  ) : (
                    <DownArrow
                      onClick={() => setShowPendingCourses(true)}
                      className="hover:cursor-pointer group-hover:text-purple-700"
                    />
                  )}
                </h2>
                {showPendingCourses && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
                    {pendingCoursesInstructor?.map((course) => (
                      <MyCoursesCourseCard
                        key={course?._id}
                        id={course?._id}
                        title={course?.title}
                        description={course?.description}
                        instructorName={course?.instructor.name}
                        avatar={course.avatar}
                      userData={userData}
                      setRender={setRender}


                      />
                    ))}
                  </div>
                )}
              </>
            )}

          {currentUser.role === "instructor"
            ? ownedCourses?.length > 0 && (
                <>
                  <h2
                    onClick={() =>
                      setShowOwnedEnrolledCourses(!showOwnedEnrolledCourses)
                    }
                    className=" group flex items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9 w-full mb-2 hover:cursor-pointer hover:bg-gray-50"
                  >
                    <span className="group-hover:text-purple-700">
                      Owned Courses
                    </span>
                    {showOwnedEnrolledCourses ? (
                      <UpArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                    ) : (
                      <DownArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                    )}
                  </h2>
                  {showOwnedEnrolledCourses && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
                      {ownedCourses.map((course) => (
                        <MyCoursesCourseCard
                          key={course?._id}
                          id={course?._id}
                          title={course?.title}
                          description={course?.description}
                          instructorName={course?.instructor.name}
                          avatar={course.avatar}
                      userData={userData}
                      setRender={setRender}


                        />
                      ))}
                    </div>
                  )}
                </>
              )
            : enrolledCourses?.length > 0 && (
                <>
                  <h2
                    onClick={() =>
                      setShowOwnedEnrolledCourses(!showOwnedEnrolledCourses)
                    }
                    className="group flex items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9 w-full mb-2 hover:cursor-pointer hover:bg-gray-50"
                  >
                    <span className="group-hover:text-purple-700">
                      Enrolled Courses
                    </span>
                    {showOwnedEnrolledCourses ? (
                      <UpArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                    ) : (
                      <DownArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                    )}
                  </h2>
                  {showOwnedEnrolledCourses && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
                      {enrolledCourses?.map((course) => (
                        <MyCoursesCourseCard
                          key={course?._id}
                          id={course?._id}
                          title={course?.title}
                          description={course?.description}
                          instructorName={course?.instructor.name}
                          avatar={course.avatar}
                      userData={userData}
                      setRender={setRender}

                        />
                      ))}
                    </div>
                  )}
                </>
              )}

          {currentUser.role === "instructor"
            ? ownedCourses?.length === 0 &&
              pendingCoursesInstructor?.length === 0 &&
              completedCourses?.length === 0 && (
                <div className="text-lg mx-4 text-red-700">
                  No Courses yet, Create your own
                </div>
              )
            : enrolledCourses?.length === 0 &&
              completedCourses?.length === 0 && (
                <div className="text-lg mx-4 text-red-700">
                  No Courses yet, Enroll in one
                </div>
              )}
        </>
      )}
    </div>
  );
}

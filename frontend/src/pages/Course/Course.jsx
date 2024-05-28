import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TickIcon from "../../utils/icons/TickIcon";
import CourseCourseCard from "./CourseCourseCard/CourseCourseCard";
import { completeCourse, enrollCourse } from "../../services/courseServices";
import useAddContentForm from "../../hooks/useAddContentForm";
import axios from "axios";
import { useState } from "react";

export default function Course({ courseData, userData, setRender }) {
  const params = useParams();
  const courseId = params.id;
  const [showAddContent, setShowAddContent] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const [contentTitle, setContentTitle] = useState("");
  const [contentURL, setContentURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let embedUrl = null;

    if (
      contentURL.match(
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
      )
    ) {
      const videoId = contentURL.match(
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
      )[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else {
      console.log("invalid url");
      return;
    }

    const data = {
      title: contentTitle,
      url: embedUrl,
    };
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios.post(
        `https://edu-stream-backend-delta.vercel.app/content/add_content/${courseId}`,
        data,
        {
          method: "POST",
          headers: headers,
        }
      );
      console.log(res.data);
      setShowAddContent(false);
      setRender((prevRender) => !prevRender);
    } catch (error) {
      console.log(error);
    }
    setContentTitle("");
    setContentURL("");
  };

  const handleEnrollCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.put(
        `https://edu-stream-backend-delta.vercel.app/course/enroll_course/${courseId}`,
        {},
        {
          method: "PUT",
          headers: headers,
        }
      );
      setRender((prevRender) => !prevRender);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.put(
        `https://edu-stream-backend-delta.vercel.app/course/complete_course/${courseId}`,
        {},
        {
          method: "PUT",
          headers: headers,
        }
      );
      setRender((prevRender) => !prevRender);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 m-2 sm:m-4 flex flex-col gap-2">
      {currentUser._id ===
        courseData?.find((course) => course._id === courseId)?.instructor
          ?._id && (
        <>
          {!userData.completed_courses.find(
            (course) => course._id === courseId
          ) && (
            <button
              onClick={() => setShowAddContent(!showAddContent)}
              className="border hover:bg-purple-700 rounded-lg hover:text-white font-semibold bg-gray-100 border-gray-300 md:rounded-[4px] text-sm px-3 shadow-sm h-9"
            >
              {showAddContent ? "Go Back" : "Add Content"}
            </button>
          )}
          {showAddContent && (
            <div className="flex justify-center mt-4">
              <form
                className="p-4 flex flex-col gap-2  w-96 border bg-gray-100 rounded-lg border-gray-300"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-1">
                  <h1 className="font-semibold ">Content Title</h1>
                  <div className="border bg-gray-100 border-gray-300 md:rounded-[4px] lg:flex items-center gap-2 text-sm px-3 py-1 shadow-sm h-9 hidden ">
                    <input
                      type="text"
                      id="contentTitle"
                      value={contentTitle}
                      onChange={(e) => setContentTitle(e.target.value)}
                      required
                      placeholder="Course Name"
                      className="bg-gray-100 focus:outline-none hidden md:block"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-semibold ">Content URL</h1>
                  <div className="border bg-gray-100 border-gray-300 md:rounded-[4px] lg:flex items-center gap-2 text-sm px-3 py-1 shadow-sm h-9 hidden ">
                    <input
                      type="text"
                      id="contentURL"
                      value={contentURL}
                      onChange={(e) => setContentURL(e.target.value)}
                      required
                      placeholder="Course Description"
                      className="bg-gray-100 focus:outline-none hidden md:block"
                    ></input>
                  </div>
                </div>
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
      {!showAddContent && (
        <>
          <div className=" flex justify-between items-center gap-2">
            <h2 className="flex-1 flex items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9">
              Course Content
            </h2>
            {currentUser.role === "enduser" &&
              !userData?.enrolled_courses?.some(
                (course) => course._id === courseId
              ) &&
              !userData?.completed_courses?.some(
                (course) => course._id === courseId
              ) && (
                <button
                  className="border hover:bg-purple-700 rounded-lg hover:text-white font-semibold bg-gray-100 border-gray-300 md:rounded-[4px] text-sm px-3 shadow-sm h-9"
                  onClick={handleEnrollCourse}
                >
                  Enroll in Course
                </button>
              )}
            {currentUser.role === "enduser" &&
              userData?.enrolled_courses?.some(
                (course) => course._id === courseId
              ) &&
              courseData
                ?.find((course) => course._id === courseId)
                ?.course_content.every((content) =>
                  content.watchedBy.includes(currentUser._id)
                ) && (
                <button
                  className="border hover:bg-purple-700 rounded-lg hover:text-white font-semibold bg-gray-100 border-gray-300 md:rounded-[4px] text-sm px-3 shadow-sm h-9"
                  onClick={handleCompleteCourse}
                >
                  Complete Course
                </button>
              )}
            {currentUser.role === "instructor" &&
              userData?.owned_courses?.some(
                (course) => course._id === courseId
              ) &&
              !userData?.completed_courses?.some(
                (course) => course._id === courseId
              ) && (
                <button
                  className="border hover:bg-purple-700 rounded-lg hover:text-white font-semibold bg-gray-100 border-gray-300 md:rounded-[4px] text-sm px-3 shadow-sm h-9"
                  onClick={handleCompleteCourse}
                >
                  Complete Course
                </button>
              )}
            {currentUser.role === "enduser" &&
              userData?.completed_courses?.some(
                (course) => course._id === courseId
              ) && (
                <div className="border rounded-lg font-semibold bg-green-600 md:rounded-[4px] text-sm px-3 shadow-sm h-9 flex items-center gap-1">
                  <TickIcon />
                  <span>Course Completed</span>
                </div>
              )}
            {currentUser.role === "instructor" &&
              userData?.completed_courses?.some(
                (course) => course._id === courseId
              ) && (
                <div className="border rounded-lg font-semibold bg-green-600 md:rounded-[4px] text-sm px-3 shadow-sm h-9 flex items-center gap-1">
                  <TickIcon />
                  <span>Course Completed</span>
                </div>
              )}
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
            {courseData
              ?.find((course) => course._id === courseId)
              ?.course_content?.map((content) => (
                <CourseCourseCard
                  key={content._id}
                  content={content}
                  setRender={setRender}
                  courseData={courseData}
                  courseId={courseId}
                  userData={userData}
                />
              ))}
            {courseData?.course_content?.length == 0 && (
              <div className=" text-lg mx-4">
                There is no content available yet
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

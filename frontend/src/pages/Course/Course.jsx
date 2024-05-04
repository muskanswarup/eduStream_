import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { submitFormFailure } from "../../redux/user/userSlice";
import TickIcon from "../../utils/icons/TickIcon";
import ContentCard from "./ContentCard.jsx/ContentCard";

export default function Course({ userData, setRender, render }) {
  const params = useParams();
  const courseId = params.id;

  const [courseData, setCourseData] = useState([]);
  const [showAddContent, setShowAddContent] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [contentTitle, setContentTitle] = useState("");
  const [contentURL, setContentURL] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `http://localhost:3000/course/get_course/${courseId}`,
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
    fetchCourse();
  }, [render]);

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
      dispatch(submitFormFailure("Invalid URL"));
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
        `http://localhost:3000/content/add_content/${courseId}`,
        data,
        {
          method: "POST",
          headers: headers,
        }
      );
      console.log(res.data);
      setRender(!render);
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
        `http://localhost:3000/course/enroll_course/${courseId}`,
        {},
        {
          method: "PUT",
          headers: headers,
        }
      );
      setRender(!render);
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
        `http://localhost:3000/course/complete_course/${courseId}`,
        {},
        {
          method: "PUT",
          headers: headers,
        }
      );
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4 flex flex-col gap-2">
      {currentUser._id === courseData.instructor && (
        <>
          <button
            onClick={() => setShowAddContent(!showAddContent)}
            className="border hover:bg-purple-700 rounded-lg hover:text-white font-semibold bg-gray-100 border-gray-300 md:rounded-[4px] text-sm px-3 shadow-sm h-9"
          >
            Add a Content
          </button>
          {showAddContent && (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contentTitle">Content Title:</label>
                <input
                  type="text"
                  id="contentTitle"
                  value={contentTitle}
                  onChange={(e) => setContentTitle(e.target.value)}
                  required
                  className="bg-slate-300 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="contentURL">Content URL:</label>
                <input
                  type="text"
                  id="contentURL"
                  value={contentURL}
                  onChange={(e) => setContentURL(e.target.value)}
                  required
                  className="bg-slate-300 border rounded-md"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          )}
        </>
      )}
      <div className="mx-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg uppercase">Course Content</h2>
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
        {currentUser.role === "instructor" &&
          userData?.owned_courses?.some((course) => course._id === courseId) &&
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        {courseData?.course_content?.map((content) => (
          <ContentCard
            key={content._id}
            content={content}
            render={render}
            setRender={setRender}
            courseData={courseData}
          />
        ))}
        {courseData?.course_content?.length == 0 && (
          <div className=" text-lg mx-4">There is no content available yet</div>
        )}
      </div>
    </div>
  );
}

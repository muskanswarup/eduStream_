import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "./Icons/DeleteIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { submitFormFailure } from "../../redux/user/userSlice";
import EyeIcon from "./Icons/WatchedIcon";
import TickIcon from "./Icons/TickIcon";

export default function Course() {
  const params = useParams();
  const courseId = params.id;
  const [render, setRender] = useState(null);

  const [courseData, setCourseData] = useState([]);
  const [userData, setUserData] = useState([]);
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
    fetchCourse();
    fetchUser();
  }, [render]);

  const handleDeleteContent = async (id) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.delete(`http://localhost:3000/content/delete_content/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleWatchedContent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios.put(
        `http://localhost:3000/content/watched_content/${id}`,
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

  console.log(courseData);
  console.log(userData);
  return (
    <div className="m-4 flex flex-col ">
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
        {currentUser.role === "enduser" &&
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
          <div
            key={content._id}
            className="cursor-pointer flex flex-col m-4 gap-1 "
          >
            <iframe
              className="object-cover rounded-md hover:opacity-90 h-60 w-full"
              title={content.title}
              src={content.url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-md">{content.title}</h3>
              {currentUser._id === courseData.instructor && (
                <div className=" group relative">
                  <DeleteIcon
                    className="text-red-700"
                    onClick={() => handleDeleteContent(content._id)}
                  />
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Delete Content
                  </div>
                </div>
              )}
              {!content.watchedBy.includes(currentUser._id) && (
                <div className=" group relative">
                  <EyeIcon
                    className="text-yellow-700"
                    onClick={() => handleWatchedContent(content._id)}
                  />
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click To Complete
                  </div>
                </div>
              )}
              {content.watchedBy.includes(currentUser._id) && (
                <div className=" group relative">
                  <TickIcon className="text-green-700" />
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Watched
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {courseData?.course_content?.length == 0 && (
          <div className=" text-lg mx-4">There is no content available yet</div>
        )}
      </div>
    </div>
  );
}

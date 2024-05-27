import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCourseCard from "./ProfileCourseCard/ProfileCourseCard";
import UpArrow from "../../utils/icons/UpArrow";
import DownArrow from "../../utils/icons/DownArrow";
import EditIcon from "../../utils/icons/EditIcon";
import SingleTickIcon from "../../utils/icons/SingleTickIcon";
import { editUser } from "../../services/userServices";
import axios from "axios";

export default function Profile({ userData, setRender, render }) {
  const { currentUser } = useSelector((state) => state.user);
  const [courseData, setCourseData] = useState([]);
  const [showCompletedCourses, setShowCompletedCourses] = useState(true);
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [aboutMe, setAboutMe] = useState(null);
 
  useEffect(() => {
    if (userData) {
      setCourseData(userData?.completed_courses?.slice(0, 3));
    }
  }, [userData]);

  const handleClick = async () => {
    if (editAboutMe === true) {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.put(
          `https://edu-stream-backend-delta.vercel.app/user/edit_user/${currentUser._id}`,
          { aboutme: aboutMe },
          { headers: headers }
        );
        
        setAboutMe(res.data.aboutme);
        setEditAboutMe(false);
        setRender(!render);
      } catch (error) {
        console.log(error);
      }
    } else {
      setEditAboutMe(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center m-2 sm:m-4">
      <div className="flex flex-col gap-2">
        <img
          src={`/${currentUser.avatar}`}
          className="object-cover rounded-full h-40 w-40 self-center"
        />
        <div className="flex flex-col gap-1">
          <h1 className="flex items-center justify-center font-semibold text-xl">
            {currentUser.name}
          </h1>
          <h1 className="flex items-center justify-center text-sm">
            {currentUser.email}
          </h1>
          <div className="font-semibold  text-white flex items-center justify-center">
            <span className="rounded-[4px]  text-xs border px-2.5 py-0.5 bg-purple-700">
              {currentUser.role}
            </span>
          </div>
          <div className="flex flex-col items-center w-80">
            <p
              className={`flex items-center justify-center text-sm border ${
                !editAboutMe && `p-2`
              } rounded-md mb-2`}
            >
              {editAboutMe ? (
                <input
                  className="p-2 rounded-md"
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              ) : userData.aboutme ? (
                userData.aboutme
              ) : (
                "Edit Your AboutMe"
              )}
            </p>
            {editAboutMe ? (
              <SingleTickIcon
                className="hover:text-purple-700 hover:cursor-pointer"
                onClick={handleClick}
              />
            ) : (
              <EditIcon
                className="hover:text-purple-700 hover:cursor-pointer"
                onClick={handleClick}
              />
            )}
          </div>
        </div>
      </div>
      {courseData?.length > 0 && (
        <>
          <h2
            onClick={() => setShowCompletedCourses(!showCompletedCourses)}
            className="group flex items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9 w-full mb-2 hover:bg-gray-50 hover:cursor-pointer mt-2"
          >
            <span className="group-hover:text-purple-700 text-md sm:text-lg">
              Recently Completed Courses
            </span>
            {showCompletedCourses ? (
              <UpArrow className="hover:cursor-pointer group-hover:text-purple-700" />
            ) : (
              <DownArrow className="hover:cursor-pointer group-hover:text-purple-700" />
            )}
          </h2>
          {showCompletedCourses && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
              {courseData?.map((course) => (
                <ProfileCourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import UserCard from "./UserCard.jsx/UserCard";
import { useSelector } from "react-redux";
import UpArrow from "../../utils/icons/UpArrow";
import DownArrow from "../../utils/icons/DownArrow";
import { getAllUsers } from "../../services/userServices";
import axios from "axios";

export default function ManageUsers({ render, setRender }) {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);

  const [showInstructor, setShowInstructor] = useState(true);
  const [showEndUser, setShowEndUser] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          "https://edu-stream-backend-delta.vercel.app/user/get_all_users",
          {
            headers: headers,
          }
        );
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [render]);
  return (
    <div className="flex-1 m-2 sm:m-4 gap-2">
      {userData?.length > 0 ? (
        <>
          {userData.some((user) => user.role === "instructor") && (
            <>
              <h2
                onClick={() => setShowInstructor(!showInstructor)}
                className="group flex w-full mb-2 items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9 hover:cursor-pointer hover:bg-gray-50"
              >
                <span className="group-hover:text-purple-700">Instructors</span>
                {showInstructor ? (
                  <UpArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                ) : (
                  <DownArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                )}
              </h2>

              {showInstructor && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
                  {userData.map(
                    (user) =>
                      currentUser._id !== user._id &&
                      user.role === "instructor" && (
                        <UserCard
                          key={user._id}
                          user={user}
                          render={render}
                          setRender={setRender}
                        />
                      )
                  )}
                </div>
              )}
            </>
          )}

          {userData.some((user) => user.role === "enduser") && (
            <>
              <h2
                onClick={() => setShowEndUser(!showEndUser)}
                className="group flex w-full mb-2 items-center justify-between px-2 font-semibold text-lg uppercase border rounded-lg bg-gray-100 border-gray-300 md:rounded-[4px] shadow-sm h-9 hover:cursor-pointer hover:bg-gray-50"
              >
                <span className="group-hover:text-purple-700">EndUsers</span>
                {showEndUser ? (
                  <UpArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                ) : (
                  <DownArrow className="hover:cursor-pointer group-hover:text-purple-700" />
                )}
              </h2>

              {showEndUser && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
                  {userData.map(
                    (user) =>
                      currentUser._id !== user._id &&
                      user.role === "enduser" && (
                        <UserCard
                          key={user._id}
                          user={user}
                          render={render}
                          setRender={setRender}
                        />
                      )
                  )}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className=" text-lg mx-4 text-red-700">
          There are no Users available yet
        </div>
      )}
    </div>
  );
}

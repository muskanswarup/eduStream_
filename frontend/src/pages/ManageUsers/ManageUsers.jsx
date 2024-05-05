import React, { useEffect, useState } from "react";
import UserCard from "./UserCard.jsx/UserCard";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ManageUsers({ render, setRender }) {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          "http://localhost:3000/user/get_all_users",
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
  });
  return (
    <div className="m-4 flex flex-col gap-2">
      {userData.length > 0 ? (
        <>
          {userData.some((user) => user.role === "instructor") && (
            <>
              <h2 className="font-semibold text-lg mx-4 uppercase ">
                Instructors
              </h2>

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
            </>
          )}

          {userData.some((user) => user.role === "enduser") && (
            <>
              <h2 className="font-semibold text-lg mx-4 uppercase ">
                EndUsers
              </h2>

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

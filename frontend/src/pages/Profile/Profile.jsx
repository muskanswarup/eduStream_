import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex-1 flex flex-col items-center m-8 ">
      <div className="flex flex-col gap-2">
        <img
          src="/cutepfp.jpg"
          className="object-cover rounded-full h-40 w-40"
        />
        <div className="flex flex-col gap-1">
          <h1 className="flex items-center justify-center font-semibold text-xl">
            {currentUser.name}
          </h1>
          <h1 className="flex items-center justify-center text-sm">
            {currentUser.email}
          </h1>
          <div className="  font-semibold  text-white flex items-center justify-center">
            <span className="rounded-[4px]  text-xs border px-2.5 py-0.5 bg-purple-700">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

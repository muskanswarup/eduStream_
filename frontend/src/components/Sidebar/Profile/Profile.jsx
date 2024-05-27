import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate()
  return (
    <div className="group hover:cursor-pointer" onClick={() => navigate("/profile")}>
      <img
        src={`/${currentUser.avatar}`}
        alt=""
        className="h-8 w-8 border rounded-full lg:hidden"
      />
      <div className="lg:flex items-center gap-4 hidden">
        <img
          src={`/${currentUser.avatar}`}
          alt=""
          className="h-12 w-12 border rounded-full"
        />
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-sm group-hover:text-purple-700">{currentUser.name }</span>
          <span className="text-xs group-hover:text-purple-700">{currentUser.email}</span>
        </div>
      </div>
    </div>
  );
}

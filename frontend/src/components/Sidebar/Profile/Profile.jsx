import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <img
        src="/cutepfp.jpg"
        alt=""
        className="h-8 w-8 border rounded-full lg:hidden"
      />

      <div className="lg:flex items-center gap-4 hidden">
        <img
          src="/cutepfp.jpg"
          alt=""
          className="h-12 w-12 border rounded-full"
        />
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-sm">{currentUser.name }</span>
          <span className="text-xs">{currentUser.email}</span>
        </div>
      </div>
    </>
  );
}

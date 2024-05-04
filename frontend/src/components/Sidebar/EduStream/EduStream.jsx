import React from "react";
import LibraryIcon from "../../../utils/icons/LibraryIcon";

export default function EduStream() {
  return (
    <>
      <div className="lg:hidden py-1 flex justify-center border border-gray-300 rounded-[4px] px-1 bg-gray-100">
        <LibraryIcon></LibraryIcon>
      </div>
      <div className="gap-4 hidden lg:flex items-center">
        <div className="py-1 flex justify-center border border-gray-300 rounded-[4px] px-1 bg-gray-100">
          <LibraryIcon></LibraryIcon>
        </div>
        <h1 className="font-semibold text-lg">EduStream</h1>
      </div>
    </>
  );
}

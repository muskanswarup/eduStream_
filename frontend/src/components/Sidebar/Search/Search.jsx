import React from "react";
import SearchIcon from "../../../utils/icons/SearchIcon";

export default function Search() {
  return (
    <>
      <div className="border bg-gray-100 border-gray-300 md:rounded-[4px] lg:flex items-center gap-2 text-sm px-3 py-1 shadow-sm h-9 hidden ">
        <SearchIcon></SearchIcon>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 focus:outline-none hidden md:block"
        ></input>
      </div>
      <div className="hover:cursor-pointer lg:hidden py-1 flex justify-center">
        <SearchIcon></SearchIcon>
      </div>
    </>
  );
}

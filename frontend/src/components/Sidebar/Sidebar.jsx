import React, { useState } from "react";
import EduStream from "./EduStream/EduStream";
import Search from "./Search/Search";
import Section from "./Section/Section";
import Profile from "./Profile/Profile";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseIcon from "../../utils/icons/CourseIcon";
import UserIcon from "../../utils/icons/UserIcon";
import BrowseIcon from "../../utils/icons/BrowseIcon";
import HomeIcon from "../../utils/icons/HomeIcon";

export default function Sidebar() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      {currentUser && (
        <nav className="my-4 ml-4 mr-2 flex-col justify-between border rounded-xl bg-gray-50 shadow-md hidden sm:flex">
          <div className=" m-4 flex flex-col gap-4">
            <EduStream />
            <Search />
            {currentUser.role !== "admin" && (
              <Section name="Home" path="/" pathname={location.pathname} />
            )}
            {currentUser.role !== "admin" && (
              <Section
                name="My Courses"
                path="/mycourses"
                pathname={location.pathname}
              />
            )}
            {currentUser.role !== "admin" && (
              <Section
                name="Browse Categories"
                path="/categories"
                pathname={location.pathname}
              />
            )}
            {currentUser.role === "admin" && (
              <Section
                name="Manage Courses"
                path="/managecourses"
                pathname={location.pathname}
              />
            )}
            {currentUser.role === "admin" && (
              <Section
                name="Manage Users"
                path="/manageusers"
                pathname={location.pathname}
              />
            )}
          </div>

          <div className=" m-4 flex flex-col gap-4">
            <Section name="LogOut" />
            <div className="border border-gray-300"></div>
            <Profile />
          </div>
        </nav>
      )}
      <div
        className="sm:hidden fixed bottom-4 left-4 h-16 w-16 border rounded-full flex justify-center items-center bg-white z-50"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <img
          src={`/${currentUser?.avatar}`}
          alt=""
          className="h-14 w-14 border rounded-full lg:hidden"
        />
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={() => setIsModalOpen(false)}
        ></div>
      )}
      {isModalOpen && currentUser.role !== "admin" && (
        <>
          <button
            className="fixed bottom-24 left-4 h-14 w-14 border rounded-full flex justify-center items-center bg-white z-50"
            onClick={() => navigate("/")}
          >
            <HomeIcon className="h-10 w-10 border border-white rounded-full lg:hidden" />
          </button>
          <button
            className="fixed bottom-20 left-20 h-14 w-14 border rounded-full flex justify-center items-center bg-white z-50"
            onClick={() => navigate("/mycourses")}
          >
            <CourseIcon className="h-10 w-10 border border-white rounded-full lg:hidden" />
          </button>
          <button
            className="fixed bottom-4 left-24 h-14 w-14 border rounded-full flex justify-center items-center bg-white z-50"
            onClick={() => navigate("/categories")}
          >
            <BrowseIcon className="h-10 w-10 border border-white rounded-full lg:hidden" />
          </button>
        </>
      )}
      {isModalOpen && currentUser.role === "admin" && (
        <>
          <button
            className="fixed bottom-24 left-4 h-14 w-14 border rounded-full flex justify-center items-center bg-white z-50 "
            onClick={() => navigate("/managecourses")}
          >
            <CourseIcon className="h-10 w-10 border border-white rounded-full lg:hidden" />
          </button>
          <button
            className="fixed bottom-4 left-24 h-14 w-14 border rounded-full flex justify-center items-center bg-white z-50"
            onClick={() => navigate("/manageusers")}
          >
            <UserIcon className="h-10 w-10 border border-white rounded-full lg:hidden" />
          </button>
        </>
      )}
    </>
  );
}

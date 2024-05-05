import React from "react";
import EduStream from "./EduStream/EduStream";
import Search from "./Search/Search";
import Section from "./Section/Section";
import Profile from "./Profile/Profile";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  return (
    currentUser && (
      <nav className="my-4 ml-4 mr-2 flex flex-col justify-between border rounded-xl bg-gray-50 shadow-md">
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
    )
  );
}

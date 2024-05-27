import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRouteInstructorEnduser() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser.role === "admin" ? (
    <Navigate to="/managecourses" />
  ) : (
    <Outlet />
  );
}

import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import MyCourses from "./pages/MyCourses/MyCourses";
import Categories from "./pages/Categories/Categories";
import Course from "./pages/Course/Course";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin/PrivateRouteAdmin";
import ManageCourses from "./pages/ManageCourses/ManageCourses";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PrivateRouteInstructorEnduser from "./components/PrivateRouteInstructorEnduser/PrivateRouteInstructorEnduser";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  const [courseData, setCourseData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          "https://edu-stream-backend-delta.vercel.app/course/get_courses",
          {
            method: "GET",
            headers: headers,
          }
        );
        const data = res.data;
        setCourseData(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `https://edu-stream-backend-delta.vercel.app/user/get_user/${currentUser._id}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        const data = res.data;
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
    fetchUser();
  }, [render]);

  console.log(userData);
  return (
    <>
      <BrowserRouter>
        <main className="flex h-screen bg-gray-200 ">
          <Sidebar />
          <div
            className={`flex-1  flex sm:my-4 sm:mr-4 overflow-y-auto border rounded-xl bg-gray-50 shadow-md 
              ${currentUser ? `sm:ml-2` : `sm:ml-4`}`}
          >
            <Routes>
              <Route
                path="/login"
                element={<Login render={render} setRender={setRender} />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route element={<PrivateRouteInstructorEnduser />}>
                <Route
                  path="/categories"
                  element={
                    <Categories courseData={courseData} userData={userData} />
                  }
                />
                <Route
                  path="/"
                  element={<Home courseData={courseData} userData={userData} />}
                />
                <Route
                  path="/mycourses"
                  element={
                    <MyCourses
                      courseData={courseData}
                      userData={userData}
                      setRender={setRender}
                      render={render}
                    />
                  }
                />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/:id"
                  element={
                    <Course
                      userData={userData}
                      setRender={setRender}
                      render={render}
                      courseData={courseData}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={<Profile userData={userData} render={render} setRender={setRender}/>}
                />
              </Route>
              <Route element={<PrivateRouteAdmin />}>
                <Route
                  path="/managecourses"
                  element={
                    <ManageCourses
                      courseData={courseData}
                      setRender={setRender}
                      render={render}
                    />
                  }
                />
                <Route
                  path="/manageusers"
                  element={
                    <ManageUsers setRender={setRender} render={render} />
                  }
                />
              </Route>
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

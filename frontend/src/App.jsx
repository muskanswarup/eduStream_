import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import MyCourses from "./pages/MyCourses/MyCourses";
import Categories from "./pages/Categories/Categories";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Course from "./pages/Course/Course";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
          "http://localhost:3000/course/get_courses",
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
          `http://localhost:3000/user/get_user/${currentUser._id}`,
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

  return (
    <>
      <BrowserRouter>
        <main className="flex h-screen bg-gray-200">
          <Sidebar />
          <div
            className={`flex-1 my-4 mr-4 overflow-y-auto border rounded-xl bg-gray-50 shadow-md ${
              currentUser ? "ml-2" : "ml-4"
            }`}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<PrivateRoute />}>
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
                      userData={userData}
                      setRender={setRender}
                      render={render}
                    />
                  }
                />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/:id"
                  element={
                    <Course
                      userData={userData}
                      setRender={setRender}
                      render={render}
                    />
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

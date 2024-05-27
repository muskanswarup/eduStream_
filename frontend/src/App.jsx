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
import React, { useState } from "react";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin/PrivateRouteAdmin";
import ManageCourses from "./pages/ManageCourses/ManageCourses";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PrivateRouteInstructorEnduser from "./components/PrivateRouteInstructorEnduser/PrivateRouteInstructorEnduser";
import useFetchBaseData from "./hooks/useFetchBaseData";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute/ProtectedAuthRoute";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [render, setRender] = useState(true);

  const { courseData, userData } = useFetchBaseData(render);

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
              <Route element={<ProtectedAuthRoute />}>
                <Route
                  path="/login"
                  element={<Login setRender={setRender} />}
                />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route element={<PrivateRouteInstructorEnduser />}>
                  <Route
                    path="/categories"
                    element={
                      <Categories courseData={courseData} userData={userData} />
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <Home courseData={courseData} userData={userData} />
                    }
                  />
                  <Route
                    path="/mycourses"
                    element={
                      <MyCourses
                        courseData={courseData}
                        userData={userData}
                        setRender={setRender}
                      />
                    }
                  />
                </Route>
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
                  element={
                    <Profile
                      userData={userData}
                      render={render}
                      setRender={setRender}
                    />
                  }
                />
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
              </Route>
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

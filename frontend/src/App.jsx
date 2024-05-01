import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import MyCourses from "./components/MyCourses/MyCourses";
import Categories from "./components/Categories/Categories";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Course from "./components/Course/Course";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <>
      <BrowserRouter>
        <main className="flex h-screen bg-gray-200">
          <Sidebar />
          <div className={`flex-1 my-4 mr-4 overflow-y-auto border rounded-xl bg-gray-50 shadow-md ${currentUser ? "ml-2" : "ml-4"}`}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<PrivateRoute />}>
                <Route path="/categories" element={<Categories />} />
                <Route path="/" element={<Home />} />
                <Route path="/mycourses" element={<MyCourses />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/:id" element={<Course />} />
              </Route>
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

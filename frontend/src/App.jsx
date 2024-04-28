import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import MyCourses from "./components/MyCourses/MyCourses";
import Categories from "./components/Categories/Categories";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="p-4 overflow-y-auto mx-auto lg:mx-16 xl:mx-32 2xl:mx-40">
          {/*  */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path="/categories" element={<Categories />} />
              <Route path="/" element={<Home />} />
              <Route path="/mycourses" element={<MyCourses />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

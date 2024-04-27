import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import MyCourses from "./components/MyCourses/MyCourses";
import Categories from "./components/Categories/Categories";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="p-4 overflow-y-auto mx-auto md:mx-12 lg:mx-24 xl:mx-44 2xl:mx-60"> 
        {/*  */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mycourses" element={<MyCourses />} />
            <Route path="/categories" element={<Categories />} />
            {/* <Route element={<PrivateRoute />}> */}
              <Route path="/profile" element={<Profile />} />
            {/* </Route> */}
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

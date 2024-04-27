import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="bg-[--ac-fg] flex items-center justify-between p-4 mx-auto border md:mx-12 lg:mx-24 xl:mx-44 2xl:mx-60">
      {/*  */}
      <div className="">
        <h3 className="text-2xl font-semibold">
          <span className="text-[--ac-dark]">Edu</span>
          <span className="text-[--ac-light]">Stream</span>
        </h3>
      </div>
      <div className="right-sec flex items-center gap-x-4">
        <ul className="flex items-center gap-x-4 text-[--ac-dark] font-semibold">
          <Link to="/">Courses</Link>
          <Link to="/mycourses">
            <li>My Courses</li>
          </Link>
          <Link to="/categories">
            <li>Browse Categories</li>
          </Link>
          <li className="hover:cursor-pointer"
          onClick={() => dispatch(logoutUser())}>LogOut</li>
        </ul>
        <Link to="/profile">
          <div className="profile h-12 w-12 bg-gray-300 rounded-full">
            <img
              src="https://avatars.githubusercontent.com/u/83662512?s=200&v=4"
              className="object-fit w-full h-full"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

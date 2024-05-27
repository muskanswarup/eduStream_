import { useSelector } from "react-redux";
import DeleteIcon from "../../../utils/icons/DeleteIcon";
import { deleteUser } from "../../../services/userServices";
import axios from "axios";

export default function UserCard({ user, render, setRender }) {
  const { currentUser } = useSelector((state) => state.user);

  const handleUserDelete = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.delete(`https://edu-stream-backend-delta.vercel.app/user/delete_user/${user._id}`, {
        method: "DELETE",
        headers: headers,
      });
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={user._id} className="cursor-pointer flex flex-col sm:m-4 gap-2 ">
      <img
        src={`/${user.avatar}`}
        alt="course-display"
        className="object-cover rounded-md hover:opacity-90 h-full w-full"
      />
      <div className="flex flex-col gap-2">
        <div className="">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            {currentUser.role === "admin" && (
              <div className=" group relative">
                <DeleteIcon
                  className="text-red-700"
                  onClick={handleUserDelete}
                />
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Delete
                </div>
              </div>
            )}
          </div>
          <p className="line-clamp-3 text-sm">{user.email}</p>
        </div>
        <h3 className="text-sm text-purple-700">{user.role}</h3>
      </div>
    </div>
  );
}

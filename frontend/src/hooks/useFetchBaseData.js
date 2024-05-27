import { useState, useEffect } from "react";
import { getUser } from "../services/userServices";
import { getCourses } from "../services/courseServices";
import { useSelector } from "react-redux";

const useFetchBaseData = (render) => {
  const { currentUser } = useSelector((state) => state.user);

  const [courseData, setCourseData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courses, user] = await Promise.all([
          getCourses(),
          currentUser && getUser(currentUser._id),
        ]);
        setCourseData(courses);
        setUserData(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [render, currentUser]);

  return { courseData, userData };
};

export default useFetchBaseData;

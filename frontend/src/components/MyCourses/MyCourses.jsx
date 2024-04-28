import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyCourses() {
  const [userData, setUserData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
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
    fetchUserData();
  }, []);

  const completedCourses = userData.completed_courses;
  const ownedCourses = userData.owned_courses;
  const enrolledCourses = userData.enrolled_courses;
  const pendingCoursesEnduser = enrolledCourses ? enrolledCourses.filter((enrolledCourse) => {
    return !userData.completed_courses.some(
      (completedCourse) => completedCourse._id === enrolledCourse._id
    );
  }) : [];
  const pendingCoursesInstructor = ownedCourses ? ownedCourses.filter((ownedCourse) => {
    return !userData.completed_courses.some(
      (completedCourse) => completedCourse._id === ownedCourse._id
    );
  }) : [];

  return (
    <div className=" pb-8">
      <h2 className="text-3xl font-bold">Completed Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 items-start">
        {completedCourses && completedCourses.map((course) => (
          <button key={course._id}>
            <div className="rounded-lg bg-gray-300 p-4">
              <div className="h-64 w-full rounded-lg bg-gray-800">
                <img
                  src="https://d15cw65ipctsrr.cloudfront.net/14/4dcbc397754fb880094f4ebde1fdb5/Java-Full-Stack-Developer-specialization-2-.png"
                  alt="course-display"
                  className="object-cover h-full w-full rounded-lg"
                  height={300}
                  width={300}
                />
              </div>
              <div className="mt-2 text-left">
                <h3 className="font-bold text-lg">{course.title}</h3>
                <p className="line-clamp-3 text-sm">{course.description}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-sm text-left">{course.instructor}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-8">Pending Courses</h2>
      {currentUser.role === "instructor" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 items-start">
          {pendingCoursesInstructor.map((course) => (
            <button key={course._id}>
              <div className="rounded-lg bg-gray-300 p-4">
                <div className="h-64 w-full rounded-lg bg-gray-800">
                  <img
                    src="https://d15cw65ipctsrr.cloudfront.net/14/4dcbc397754fb880094f4ebde1fdb5/Java-Full-Stack-Developer-specialization-2-.png"
                    alt="course-display"
                    className="object-cover h-full w-full rounded-lg"
                    height={300}
                    width={300}
                  />
                </div>
                <div className="mt-2 text-left">
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <p className="line-clamp-3 text-sm">{course.description}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm text-left">{course.instructor}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 items-start">
          {pendingCoursesEnduser.map((course) => (
            <button key={course._id}>
              <div className="rounded-lg bg-gray-300 p-4">
                <div className="h-64 w-full rounded-lg bg-gray-800">
                  <img
                    src="https://d15cw65ipctsrr.cloudfront.net/14/4dcbc397754fb880094f4ebde1fdb5/Java-Full-Stack-Developer-specialization-2-.png"
                    alt="course-display"
                    className="object-cover h-full w-full rounded-lg"
                    height={300}
                    width={300}
                  />
                </div>
                <div className="mt-2 text-left">
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <p className="line-clamp-3 text-sm">{course.description}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm text-left">{course.instructor}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {currentUser.role === "instructor" ? (
        <>
          <h2 className="text-3xl font-bold mt-8">Owned Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 items-start">
            {ownedCourses && ownedCourses.map((course) => (
              <button key={course._id}>
                <div className="rounded-lg bg-gray-300 p-4">
                  <div className="h-64 w-full rounded-lg bg-gray-800">
                    <img
                      src="https://d15cw65ipctsrr.cloudfront.net/14/4dcbc397754fb880094f4ebde1fdb5/Java-Full-Stack-Developer-specialization-2-.png"
                      alt="course-display"
                      className="object-cover h-full w-full rounded-lg"
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className="mt-2 text-left">
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <p className="line-clamp-3 text-sm">{course.description}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm text-left">{course.instructor}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mt-8">Enrolled Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 items-start">
            {enrolledCourses.map((course) => (
              <button key={course._id}>
                <div className="rounded-lg bg-gray-300 p-4">
                  <div className="h-64 w-full rounded-lg bg-gray-800">
                    <img
                      src="https://d15cw65ipctsrr.cloudfront.net/14/4dcbc397754fb880094f4ebde1fdb5/Java-Full-Stack-Developer-specialization-2-.png"
                      alt="course-display"
                      className="object-cover h-full w-full rounded-lg"
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className="mt-2 text-left">
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <p className="line-clamp-3 text-sm">{course.description}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm text-left">{course.instructor}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

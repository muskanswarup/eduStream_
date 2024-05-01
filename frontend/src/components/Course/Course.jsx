import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Course() {
  const params = useParams();
  const courseId = params.id;

  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(
          `http://localhost:3000/course/get_course/${courseId}`,
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
    fetchCourse();
  }, []);

  return (
    <div className="m-4 flex flex-col gap-4">
      <h2 className="text-3xl font-semibold mx-4">Course Content</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        {courseData?.course_content?.map((content) => (
          <div
            key={content._id}
            className="cursor-pointer flex flex-col m-4 gap-2 "
          >
            <iframe
              className="object-cover rounded-md hover:opacity-90 h-60 w-full"
              title={content.title}
              src={content.url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg">{content.title}</h3>
            </div>
          </div>
        ))}
        {courseData?.course_content?.length == 0 && <div className=" text-lg mx-4">There is no content available yet</div>}
      </div>
    </div>
  );
}

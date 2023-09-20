import React, {  useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import PaginationDataGrid from "../../../components/table/PaginationDataGrid";



export default function Course() {
  const [render, setRender] = useState(1);
  const navigate = useNavigate();

  const handletabs = (e:any)=>{

  }

  return (
    <>
      <Breadcrumb name="Course">
        <button
          onClick={() => navigate("/institute/course/create")}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add New Course
        </button>
        <button
          onClick={() => navigate("/institute/course/sub-course")}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
        Sub-Course
        </button>
        <button
          onClick={() => navigate("/institute/course/course_link")}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
        Link Course
        </button>
      </Breadcrumb>
      <div className="mt-3">
        <PaginationDataGrid
          name="instituteCourses"
          height="70vh"
          refresh={render}
        />
      </div>
    </>
  );
}

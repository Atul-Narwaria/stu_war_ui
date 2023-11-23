import React, {  useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import PaginationDataGrid from "../../../../components/table/PaginationDataGrid";



export default function CourseStudent() {
  const [render, setRender] = useState(1);
  const navigate = useNavigate();

  const handletabs = (e:any)=>{

  }

  return (
    <>
      <Breadcrumb name="Students">
        <button
          onClick={() => navigate("/institute/course/student/create")}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add Students
        </button>
      </Breadcrumb>
      <div className="mt-3">
        {/* <DataGridSkeleton /> */}
      
        
        <PaginationDataGrid
          name="instituteSubCourses"
          height="70vh"
          refresh={render}
        />
      </div>
    </>
  );
}

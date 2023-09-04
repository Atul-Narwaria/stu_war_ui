import React, { useEffect, useState } from "react";
import DataGrids from "../../../components/table/DataGrids";
import Breadcrumb from "../../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import PaginationDataGrid from "../../../components/table/PaginationDataGrid";

export default function Student() {
  const [render, setRender] = useState(1);
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb name="Students">
        <button
          onClick={() => navigate("/institute/student/create")}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add New Student
        </button>
      </Breadcrumb>
      <div className="mt-3">
        {/* <DataGridSkeleton /> */}
        <PaginationDataGrid
          name="instituteStudents"
          height="70vh"
          refresh={render}
        />
      </div>
    </>
  );
}

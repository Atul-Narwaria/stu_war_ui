import React, {  useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import PaginationDataGrid from "../../../components/table/PaginationDataGrid";

export default function Teacher() {
  const [render, setRender] = useState(1);
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb name="Teachers">
        <button
          onClick={() => navigate("/institute/teacher/create")}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add New Teacher
        </button>
      </Breadcrumb>
      <div className="mt-3">
        {/* <DataGridSkeleton /> */}
        <PaginationDataGrid
          name="instituteTeacher"
          height="70vh"
          refresh={render}
        />
      </div>
    </>
  );
}

import React, {  useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import PaginationDataGrid from "../../../components/table/PaginationDataGrid";
import BasicTabs from "../../../components/Tabs/BasicTabs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function Course() {
  const [currentTab, setCurrentTab] = useState<any>(0);
  const [render, setRender] = useState(1);
  const navigate = useNavigate();
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
          onClick={() => navigate("/institute/course/sub-course/create")}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add New Sub-Course
        </button>
      </Breadcrumb>
      <div className="mt-3">
        {/* <DataGridSkeleton /> */}
        <div className="flex"></div>
        <BasicTabs />
        <PaginationDataGrid
          name="instituteCourses"
          height="70vh"
          refresh={render}
        />
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import DataGrids from "../../../components/table/DataGrids";
import Basicmodel from "../../../components/modals/Basicmodel";
import Breadcrumb from "../../../components/Breadcrumb";
import TextField from "@mui/material/TextField";
import { getActiveCountry } from "../../../service/admin/location/country.service";
import Autocomplete from "@mui/material/Autocomplete";
import DataGridSkeleton from "../../../components/skeletons/DataGridSkeleton";
import { useForm, SubmitHandler } from "react-hook-form";
import { getActiveStatesByCountry } from "../../../service/admin/location/state.service";
import { getCityByStateCountry } from "../../../service/admin/location/city.service";
import { createInstiture } from "../../../service/admin/institute/institue.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        <DataGrids name="instituteStudent" height="70vh" refresh={render} />
      </div>
    </>
  );
}

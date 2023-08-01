import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import DataGrids from "../../components/table/DataGrids";

export default function Location() {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb name="Location">
        <button
          onClick={() => navigate("/admin/location/country")}
          className="bg-primary text-white px-5 py-2 rounded-lg shadow-lg"
        >
          {" "}
          Country
        </button>
        <button
          onClick={() => navigate("/admin/location/state")}
          className="bg-primary text-white px-5 py-2 rounded-lg shadow-lg"
        >
          {" "}
          State
        </button>
        <button
          onClick={() => navigate("/admin/location/city")}
          className="bg-primary text-white px-5 py-2 rounded-lg shadow-lg"
        >
          {" "}
          City
        </button>
      </Breadcrumb>
      <div className="mt-3">
        <DataGrids name="locationMaster" refresh={0} />
      </div>
    </>
  );
}

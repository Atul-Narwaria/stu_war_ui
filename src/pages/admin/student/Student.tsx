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
import StepperBasic from "../../../components/stepper/StepperBasic";
import { useNavigate } from "react-router-dom";
import PaginationDataGrid from "../../../components/table/PaginationDataGrid";

// interface stundetSubmissionForm {
//   firstname: string;
//   lastname: string;
//   email: string;
//   phone: number;
//   password: string;
//   confirmPassword: string;
//   dob: Date;
//   profile: string;
//   county: string;
//   state: string;
//   city: string;
//   address: string;
//   pin: string;

// }

export default function Student() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryList, setCountrylist] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState([]);
  const [statelist, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [citylist, setCityList] = useState([]);
  const [selectCity, setSelectedCity] = useState<any>(null);
  const [selectCountry, setSelectedCounty] = useState<any>("");
  const [render, setRender] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const api = async () => {
      const get = await getActiveCountry();
      if (get?.status == "success") {
        let data = get?.message;
        console.log(data);
        setDefaultCountry(
          data?.find((option: any) => option?.CounrtyName === "India")
        );
        setSelectedCounty(
          data?.find((option: any) => option?.CounrtyName === "India")
        );
        let county = data?.find(
          (option: any) => option?.CounrtyName === "India"
        );
        setSelectedCounty(county?.id);
        handleStateByCountry(county?.id);
        setCountrylist(data);
      }
    };

    api();
  }, []);
  const handleStateByCountry = async (value: string) => {
    const get = await getActiveStatesByCountry(value);
    setSelectedCounty(value);
    setStateList(get.message);
  };
  const handleCityByState = async (countyId: string, StateId: string) => {
    setSelectedState(StateId);
    const get = await getCityByStateCountry(countyId, StateId);
    console.log(get.message);
    setCityList(get.message);
  };

  return (
    <>
      <Breadcrumb name="Institue">
        <button
          onClick={() => navigate("/admin/student/create")}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add
        </button>
      </Breadcrumb>
      <div className="mt-3">
        {/* <DataGridSkeleton /> */}
        <PaginationDataGrid
          name="institutemaster"
          height="70vh"
          refresh={render}
        />
      </div>
    </>
  );
}

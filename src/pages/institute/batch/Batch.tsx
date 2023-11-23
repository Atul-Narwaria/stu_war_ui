import React, { useEffect, useState } from "react";
import DataGrids from "../../../components/table/DataGrids";
import Basicmodel from "../../../components/modals/Basicmodel";
import Breadcrumb from "../../../components/Breadcrumb";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { getInstituteSubCoursesActive } from "../../../service/institute/sub-course.service";
import { useNavigate } from "react-router-dom";
import PaginationDataGrid from "../../../components/table/PaginationDataGrid";

interface instituteBatchForm {
  fk_sub_course_id: string;
  name: string;
}

export default function Batch() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [render, setRender] = useState(1);
  const [subCourseList, setSubCourseList] = useState<any>();
  const [selectedSubCourse, setSelectedSubCourse] = useState<any>(null);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<instituteBatchForm>();

 useEffect(()=>{
    const api = async ()=>{
        const get = await getInstituteSubCoursesActive();
        if (get?.status == "success") {
            let data = get?.message;
            setSubCourseList(data);
          }
    }
    api();
 },[])
 
  const onSubmit: SubmitHandler<instituteBatchForm> = async (data: any) => {
//     const { message, status } = await createInstiture(
//       data.name,
//       data.email,
//       data.phone,
//       data.password,
//       data.confirmPassword,
//       selectCountry,
//       selectedState,
//       selectCity,
//       data.address,
//       data.pin
//     );
//     console.log(status);
//     if (status == "error") {
//       toast.error(message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     } else {
//       toast.success(message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });

//       reset();
//       setIsModalOpen(false);
//       setRender(render + 1);
//     }
  };
  return (
    <>
      <Breadcrumb name="Batch ">
        <button
          onClick={() => navigate("/institute/batch/create")}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add
        </button>
      </Breadcrumb>
      <div className="mt-3">
        <PaginationDataGrid height={500} name="InstituteBatch" />
      </div>

  
    </>
  );
}

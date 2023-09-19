import React, { useEffect, useState } from "react";
import DataGrids from "../../../components/table/DataGrids";
import Basicmodel from "../../../components/modals/Basicmodel";
import Breadcrumb from "../../../components/Breadcrumb";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { getInstituteSubCoursesActive } from "../../../service/institute/sub-course.service";

interface instituteBatchForm {
  fk_sub_course_id: string;
  name: string;
}

export default function Batch() {
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
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add
        </button>
      </Breadcrumb>
      <div className="mt-3">
        {/* <DataGridSkeleton /> */}
        {/* <DataGrids name="institutemaster" height="70vh" refresh={render} /> */}
      </div>

      {isModalOpen ? (
        <div className="">
          <Basicmodel
            isOpen={isModalOpen}
            isClode={setIsModalOpen}
            width="w-[70vw]"
            name="Create  Batch"
          >
            <form
              className=" flex flex-col p-2"
              onSubmit={handleSubmit(onSubmit)}
            >
                 
              
                <div className="my-3">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={subCourseList}
                  getOptionLabel={(option: any) => option?.name}
                  sx={{ width: 1 }}
                  onChange={(event: any, newValue: any | null) => {
                    setSelectedSubCourse(newValue?.id);
                  }}
                  // onChange={(event, value) => {
                  //   handleStateByCountry(value?.id);
                  // }}
                  renderInput={(params) => (
                    <>
                     <TextField
                        error={
                          selectedSubCourse == null
                            ? errors.fk_sub_course_id
                              ? true
                              : false
                            : false
                        }
                        {...params}
                        label="select state"
                        {...register("fk_sub_course_id", {
                          required: "course  required",
                        })}
                      />
                      {selectedSubCourse == null ? (
                        errors.fk_sub_course_id ? (
                          <p role="alert" className="input-error text-red-700">
                            {errors.fk_sub_course_id?.message}
                          </p>
                        ) : null
                      ) : null}
                    </>
                  )}
                />
                </div>
             <div className="mb-3">
             <TextField
                error={errors.name ? true : false}
                {...register("name", {
                  required: "name required",
                  minLength: {
                    value: 3,
                    message: "minimun 3 character required",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter a valid name (letters only)",
                  },
                })}
                id="outlined-basic"
                label="name"
                sx={{
                  width: 1,
                }}
                variant="outlined"
              />
              {errors.name ? (
                <p role="alert" className="input-error text-red-700">
                  {errors.name?.message}
                </p>
              ) : null}
             </div>
              <button
                type="submit"
                // onClick={() => handleSubmit(onSubmit)}
                className=" bg-secondary text-white text-xl w-full p-3 hover:bg-primary hover:shadow-xl 
          duration-500 rounded-lg"
              >
                Create
              </button>
            </form>
          </Basicmodel>
        </div>
      ) : null}
    </>
  );
}

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  deleteCountry,
  getActiveCountry,
  updateCountryStatus,
} from "../../service/admin/location/country.service";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import {
  deleteState,
  getAllStates,
  updateStateStatus,
} from "../../service/admin/location/state.service";
import {
  deleteCity,
  getAllCountryStateCity,
  updateCityStatus,
} from "../../service/admin/location/city.service";
import {
  deleteInstitute,
  getAllInstitute,
  updateInstitueStatus,
} from "../../service/admin/institute/institue.service";
import { getInstituteStudents } from "../../service/institute/student.service";
import Swal from "sweetalert2";
import { deleteInstituteSubCourse } from "../../service/institute/sub-course.service";
import { InstituteCreateCourselink, deleteInstituteCourselink, deleteInstituteStudentCourse, getCourseStudents, getSubCourseStudents } from "../../service/institute/courseLink.service";
import { getInstituteCoursesSubCourseList } from "../../service/institute/course.service";
import { getInstituteTeacher, getInstituteTeacherActiveAll } from "../../service/institute/teacher.service";
import { createBatchTeacher } from "../../service/institute/batch.service";

export default function DataGrids(props: {
  name: string;
  id?: string;
  refresh?: number;
  height?: string;
  dataid?:string;
  background?:any
}) {
  let id:string = "NA";
  if(props.id){
    id = props.id;
  }
  const [loading, setloading] = useState<boolean>(true);
  let columns: any = [];
    let [tableRow, settableRow] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  let fetchActiveCountryData = async () => {
    const get = await getActiveCountry();
    let dt: any = [];
    get?.message?.map((item: any, index: number) => {
      dt.push({
        id: index + 1,
        name: item.CounrtyName,
        uuid: item.id,
        status: item.status,
      });
    });
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "AdminActiveCountry") {
    columns = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "Name", width: 300 },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: (params: any) => {
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await updateCountryStatus(
              params.row.uuid,
              !params.row.status
            );
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetchActiveCountryData();
            }
            setloading(false);
          };
          const handlepDelete = async () => {
            setloading(true);
            const { message, status } = await deleteCountry(params.row.uuid);
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetchActiveCountryData();
            }
            setloading(false);
          };

          return (
            <div className="flex gap-4 flex-row">
              {params.row.status == true ? (
                <>
                  {params.row.status}
                  <FaEye
                    onClick={handlepUpdateStatus}
                    className=" text-blue-700 hover:cursor-pointer text-lg"
                  />
                </>
              ) : (
                <FaEyeSlash
                  onClick={handlepUpdateStatus}
                  className=" text-blue-700 hover:cursor-pointer text-lg"
                />
              )}
              <FaTrash
                onClick={handlepDelete}
                className=" text-red-700 hover:cursor-pointer text-lg"
              />
            </div>
          );
        },
      },
    ];
  }

  let fetchActiveStateData = async () => {
    const get = await getAllStates();
    let dt: any = [];
    get?.message?.map((item: any, index: number) => {
      console.log(item.country.CounrtyName);
      dt.push({
        id: index + 1,
        name: item.stateName,
        uuid: item.id,
        country: item.country.CounrtyName,
        status: item.status,
      });
    });
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "AdminActiveState") {
    columns = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "State Name", width: 300 },
      { field: "country", headerName: "Country Name", width: 300 },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: (params: any) => {
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await updateStateStatus(
              params.row.uuid,
              !params.row.status
            );
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetchActiveStateData();
            }
            setloading(false);
          };
          const handlepDelete = async () => {
            setloading(true);
            const { message, status } = await deleteState(params.row.uuid);
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetchActiveStateData();
            }
            setloading(false);
          };
          return (
            <div className="flex gap-4 flex-row">
              {params.row.status == true ? (
                <>
                  {params.row.status}
                  <FaEye
                    onClick={handlepUpdateStatus}
                    className=" text-blue-700 hover:cursor-pointer text-lg"
                  />
                </>
              ) : (
                <FaEyeSlash
                  onClick={handlepUpdateStatus}
                  className=" text-blue-700 hover:cursor-pointer text-lg"
                />
              )}
              <FaTrash
                onClick={handlepDelete}
                className=" text-red-700 hover:cursor-pointer text-lg"
              />
            </div>
          );
        },
      },
    ];
  }

  let fetch_AllCountryStateCity = async () => {
    const get = await getAllCountryStateCity();
    let dt: any = [];
    get?.message?.map((item: any, index: number) => {
      dt.push({
        id: index + 1,
        city: item?.cityName,
        state: item?.state?.stateName,
        country: item?.state?.country?.CounrtyName,
      });
    });
    console.log(dt);
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "locationMaster") {
    columns = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "country", headerName: "Country Name", width: 300 },
      { field: "state", headerName: "State Name", width: 300 },
      { field: "city", headerName: "City Name", width: 300 },
    ];
  }

  let fetch_AllCity = async () => {
    const get = await getAllCountryStateCity();
    let dt: any = [];
    if (get?.message) {
      get.message?.map((item: any, index: number) => {
        dt.push({
          id: index + 1,
          city: item?.cityName,
          uuid: item.id,
          status: item.status,
          state: item?.state?.stateName,
          country: item?.state?.country?.CounrtyName,
        });
      });
    }
    console.log(dt);
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "AdminCity") {
    columns = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "country", headerName: "Country Name", width: 300 },
      { field: "state", headerName: "State Name", width: 300 },
      { field: "city", headerName: "City Name", width: 300 },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: (params: any) => {
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await updateCityStatus(
              params.row.uuid,
              !params.row.status
            );
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetch_AllCity();
            }
            setloading(false);
          };
          const handlepDelete = async () => {
            setloading(true);
            const { message, status } = await deleteCity(params.row.uuid);
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetch_AllCity();
            }
            setloading(false);
          };
          return (
            <div className="flex gap-4 flex-row">
              {params.row.status == true ? (
                <>
                  {params.row.status}
                  <FaEye
                    onClick={handlepUpdateStatus}
                    className=" text-blue-700 hover:cursor-pointer text-lg"
                  />
                </>
              ) : (
                <FaEyeSlash
                  onClick={handlepUpdateStatus}
                  className=" text-blue-700 hover:cursor-pointer text-lg"
                />
              )}
              <FaTrash
                onClick={handlepDelete}
                className=" text-red-700 hover:cursor-pointer text-lg"
              />
            </div>
          );
        },
      },
    ];
  }

  let fetchAllInstitute = async () => {
    const get = await getAllInstitute();
    console.log(get);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          dt.push({
            id: index + 1,
            uuid: item.id,
            status: item.status,
            name: item.name,
            code: item.code,
            email: item.email,
            phone: item.phone,
            state: item?.instituteAddress[0]?.state?.stateName,
            city: item?.instituteAddress[0]?.city?.cityName,
          });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "institutemaster") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "code", headerName: "code", width: 120 },
      { field: "email", headerName: "email", width: 240 },
      { field: "phone", headerName: "phone", width: 140 },
      { field: "state", headerName: "state", width: 100 },
      { field: "city", headerName: "city", width: 200 },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: (params: any) => {
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await updateInstitueStatus(
              params.row.uuid,
              !params.row.status
            );
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetchAllInstitute();
            }
            setloading(false);
          };
          const handlepDelete = async () => {
            setloading(true);
            const { message, status } = await deleteInstitute(params.row.uuid);
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetchAllInstitute();
            }
            setloading(false);
          };
          return (
            <div className="flex gap-4 flex-row">
              {params.row.status == true ? (
                <>
                  {params.row.status}
                  <FaEye
                    onClick={handlepUpdateStatus}
                    className=" text-blue-700 hover:cursor-pointer text-lg"
                  />
                </>
              ) : (
                <FaEyeSlash
                  onClick={handlepUpdateStatus}
                  className=" text-blue-700 hover:cursor-pointer text-lg"
                />
              )}
              <FaTrash
                onClick={handlepDelete}
                className=" text-red-700 hover:cursor-pointer text-lg"
              />
            </div>
          );
        },
      },
    ];
  }
  let fetchAllInstituteStudents = async () => {
    const get = await getInstituteStudents();
    console.log(get);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          dt.push({
            id: index + 1,
            uuid: item.id,
            status: item.status,
            name: item.firstName + " " + item.lastName,
            admissionid: item.admissionId,
            email: item.email,
            phone: item.phone,
            DOB: item.dob,
            gender: item.gender,
          });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "instituteStudents") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "email", width: 120 },
      { field: "phone", headerName: "phone", width: 240 },
      { field: "DOB", headerName: "date of birth", width: 140 },
      { field: "gender", headerName: "gender", width: 100 },
      { field: "admissionid", headerName: "admission id", width: 200 },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: (params: any) => {
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await updateInstitueStatus(
              params.row.uuid,
              !params.row.status
            );
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetchAllInstitute();
            }
            setloading(false);
          };
          const handlepDelete = async () => {
            setloading(true);
            const { message, status } = await deleteInstitute(params.row.uuid);
            if (status == "error") {
              toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              fetchAllInstitute();
            }
            setloading(false);
          };
          return (
            <div className="flex gap-4 flex-row">
              {params.row.status == true ? (
                <>
                  {params.row.status}
                  <FaEye
                    onClick={handlepUpdateStatus}
                    className=" text-blue-700 hover:cursor-pointer text-lg"
                  />
                </>
              ) : (
                <FaEyeSlash
                  onClick={handlepUpdateStatus}
                  className=" text-blue-700 hover:cursor-pointer text-lg"
                />
              )}
              <FaTrash
                onClick={handlepDelete}
                className=" text-red-700 hover:cursor-pointer text-lg"
              />
            </div>
          );
        },
      },
    ];
  }

  let fetchCourseSubCourseView = async () => {
    const get:any = await getInstituteCoursesSubCourseList(id);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          let subCourse = item.subCourses;
              dt.push({ 
                id: index + 1,
                uuid: item.id,
                status: subCourse.status,
                name: subCourse.name,
                image: subCourse.image,
                amount: subCourse.amount,
                duration:subCourse.duration,
              });
           
         
        });
      }
    }
    console.log(dt)
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "CourseSubCourseView") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "image", headerName: "Image", width: 200,   editable: true,
      renderCell: (params:any) => <img width="70" height="70" className="rounded-[50%]" src={params.value} />, },
      { field: "amount", headerName: "Amount", width: 240 ,},
      { field: "duration", headerName: "Duration", width: 150 ,},
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params: any) => {
          const handlepDelete = async () => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this item!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async(result:any) => {
              if (result.isConfirmed) {
                const { message, status } = await deleteInstituteCourselink(
                  params.row.uuid
                );
                if (status == "error") {
                  toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                } else {
                  toast.success(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  fetchCourseSubCourseView();
                }
           
                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
              }
            });

           
          };
          
          return (
            <div className="flex gap-4 flex-row">
            
              <FaTrash
                onClick={handlepDelete}
                className=" text-red-700 hover:cursor-pointer text-lg"
              />
            </div>
          );
        }
      
    }
    ];
  }

  let subCourseStudents = async () => {
    const get:any = await getSubCourseStudents(props.dataid);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          let userData = item?.stundetmaster;
              dt.push({ 
                id: index + 1,
                uuid: item.id,
                name: userData?.firstName+ ' '+userData?.lastName,
                email: userData?.email,
                phone: userData?.phone,
              });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "subCourseStudents") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "email", width: 240 ,},
      { field: "phone", headerName: "phone", width: 150 ,},
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params: any) => {
          const handlepDelete = async () => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this item!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async(result:any) => {
              if (result.isConfirmed) {
                const { message, status } = await deleteInstituteStudentCourse(
                  params.row.uuid
                );
                if (status == "error") {
                  toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                } else {
                  toast.success(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  fetchCourseSubCourseView();
                }
           
                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
              }
            });

           
          };
          
          return (
            <div className="flex gap-4 flex-row">
            
              <FaTrash
                onClick={handlepDelete}
                className=" text-red-700 hover:cursor-pointer text-lg"
              />
            </div>
          );
        }
      
    }
    ];
  }

  let CourseStudents = async () => {
    const get:any = await getCourseStudents(props.dataid);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          let userData = item?.stundetmaster;
              dt.push({ 
                id: index + 1,
                uuid: item.id,
                name: userData?.firstName+ ' '+userData?.lastName,
                email: userData?.email,
                phone: userData?.phone,
              });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "CourseStudents") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "email", width: 240 ,},
      { field: "phone", headerName: "phone", width: 150 ,},
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params: any) => {
          const handlepDelete = async () => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this item!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async(result:any) => {
              if (result.isConfirmed) {
                const { message, status } = await deleteInstituteStudentCourse(
                  params.row.uuid
                );
                if (status == "error") {
                  toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                } else {
                  toast.success(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  fetchCourseSubCourseView();
                }
           
                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
              }
            });

           
          };
          
          return (
            <div className="flex gap-4 flex-row">
            
              <FaTrash
                onClick={handlepDelete}
                className=" text-red-700 hover:cursor-pointer text-lg"
              />
            </div>
          );
        }
      
    }
    ];
  }

  let activeTeacher = async () => {
    const get:any = await getInstituteTeacherActiveAll();
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
         
              dt.push({ 
                id: index + 1,
                uuid: item.id,
                name: item?.firstName+ ' '+item?.lastName,
                email: item?.email,
                phone: item?.phone,
              });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "activeTeacher") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "email", width: 240 ,},
      { field: "phone", headerName: "phone", width: 150 ,},
     
    ];
  }



  useEffect(() => {
    if (props.name === "AdminActiveCountry" && props.refresh) {
      fetchActiveCountryData();
    }
    if (props.name === "AdminActiveState" && props.refresh) {
      fetchActiveStateData();
    }
    if (props.name === "locationMaster") {
      fetch_AllCountryStateCity();
    }
    if (props.name === "AdminCity" && props.refresh) {
      fetch_AllCity();
    }
    if (props.name === "institutemaster" && props.refresh) {
      fetchAllInstitute();
    }
    if (props.name === "instituteStudents" && props.refresh) {
      fetchAllInstituteStudents();
    }
    if(props.name === "CourseSubCourseView" && props.refresh) {
      fetchCourseSubCourseView();
    }
    if(props.name === "subCourseStudents" ) {
      subCourseStudents();
    }
    if(props.name === "CourseStudents" ) {
      CourseStudents();
    }
    if(props.name === "activeTeacher" ) {
      activeTeacher();
    }
    
  }, [props.refresh]);


  const handleRowClick = (params:any)=>{
    console.log(params)
    if(props.name === "activeTeacher" ) {
      Swal.fire({
        icon: 'question',
        html:
          'Do you want to add <b>' + params.row.name+ '</b> in this batch ?, ' ,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const create:any =await createBatchTeacher(params.row.uuid,props.dataid)
            if (create?.status === 'success') {
              Swal.fire({
                icon: 'success',
                text:create?.message,
              })
            }else{
              Swal.fire({
                icon: 'error',
                text:create?.message,
              })
            }
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  }
   
  return (
    <>
      {loading ? (
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ background: "gray", width: 1 }}
          height={props.height ? props.height : 400}
        />
      ) : (
        <Box
          sx={{ height: props.height ? props.height : 400, width: 1 }}
          className={props.background ? props.background : ` shadow-md rounded-xl p-2 bg-gray-50`}
        >
          <DataGrid
            sx={{ border: 0 }}
            rows={tableRow}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            onRowClick={handleRowClick}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState,useRef,Fragment } from "react";
import {
  deleteCountry,
  getActiveCountry,
  updateCountryStatus,
} from "../../service/admin/location/country.service";
import { FaAudible, FaCog, FaEdit, FaEye, FaEyeSlash, FaFile, FaFilePdf, FaFileWord, FaKey, FaList, FaStar, FaStop, FaTrash, FaUsers, FaVideo } from "react-icons/fa";
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
import {
  deleteInstituteStudent,
  getInstituteStudents,
  getInstituteStudentsSearch,
  updateInstitueStundetStatus,
} from "../../service/institute/student.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { encryptUUID } from "../../helper/encryptionKey";
import dayjs from "dayjs";
import { deleteInstituteTeacher, getInstituteTeacher, getInstituteTeacherSearch, updateInstitueTeacherStatus } from "../../service/institute/teacher.service";
import { deleteInstituteCourse, getInstituteCourses, getInstituteCoursesSearch, updateInstitueCourseStatus } from "../../service/institute/course.service";
import { deleteInstituteSubCourse, getInstituteSubCourses, getInstituteSubCoursesSearch, updateInstitueSubCourseStatus } from "../../service/institute/sub-course.service";
import { InstituteBatchGetAll, InstituteBatchLiveClassCreate, InstituteBatchLiveClassStatus, InstituteBatchSearch, InstituteBatchStatus, InstituteLiveClassByBatch, deleteBatchStudent, getBatchStudents, getBatchStudentsSearch, getbatchTeacher } from "../../service/institute/batch.service";
import { Dialog, Transition } from '@headlessui/react'
import DataGrids from "./DataGrids";
import Basicmodel from "../modals/Basicmodel";
import Switch from "@mui/material/Switch";
import { TeacherBatchAssignmentGet, TeacherBatchAssignmentSearchGet, TeacherBatchesAssignmentDelete } from "../../service/teacher/teacherBatch.service";
import moment from "moment";
import { StudentBatchAssignmentGet, StudentBatchAssignmentGetSearch } from "../../service/student/studentBatch.service";
import { getLastpartFromString, isUrl } from "../../helper/Url";
import { truncateHTMLChar } from "../../helper/helper";
import { Tooltip } from "@mui/material";
import ReactHtmlParser from 'react-html-parser';

export default function PaginationDataGrid(props: {
  name: String;
  id?:any;
  refresh?: number;
  height?: any;
  dataId?:any;
}) {
const [icons, setIcons] = useState<any>([]);
  const [open, setOpen] = useState(false)
  const [render, setRender] = useState(0)
  const cancelButtonRef = useRef(null)
  const [liveClassStatus, setLiveClassStatus] =useState<boolean>(false) 
  const navigate = useNavigate();
  const [columnWidths, setColumnWidths] = useState({});

  const handleColumnWidthChange = (newColumnWidths:any) => {
    setColumnWidths(newColumnWidths);
  };
  const [loading, setloading] = useState<boolean>(false);
  const [query, setQuery] = useState<any>(null);
  let columns: any = [];
  let [tableRow, settableRow] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRow, setTotalRow] = useState(0);
  const [modelData, setModelDate] = useState<any>([]);

  const handleLiveClassCreate = async (id:any)=>{
    console.log(id)
    Swal.fire({
      title: "Do you want to create new live class ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "yes",
      denyButtonText: `No `
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let create:any = await InstituteBatchLiveClassCreate(id);
        console.log(create)
        if(create.status === "success"){
        return  Swal.fire(create.message,"", "success");
        }
      return  Swal.fire(create.message, "", "error");
      } 
    });
  }

  let fetchAllInstituteStudents = async () => {
   
    setloading(true)
    let get;
    if (query === null || query === undefined) {
      get = await getInstituteStudents(page);
    } else {
      get = await getInstituteStudentsSearch(query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
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
            DOB: dayjs(item.date).format('YYYY-MM-DD'),
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
      { field: "name", headerName: "Name", width: 200 ,},
      { field: "email", headerName: "email", width: 240 ,},
      { field: "phone", headerName: "phone", width: 150 ,},
      { field: "DOB", headerName: "date of birth", width: 150 ,},
      { field: "gender", headerName: "gender", width: 100, },
      { field: "admissionid", headerName: "admission id", width: 200, },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params: any) => {
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await updateInstitueStundetStatus(
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
              fetchAllInstituteStudents();
            }
          };
          const handlepEdit = async () => {
            let  key = encryptUUID(params.row.uuid)
 
            navigate(`/institute/student/edit/${key}`)
          };
          const handlepDelete = async () => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this item! And also delete all data from this user',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async(result) => {
            setloading(true);

              if (result.isConfirmed) {
                const { message, status } = await deleteInstituteStudent(
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
                  fetchAllInstituteStudents();
                }
            setloading(false);

                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
              }
              setloading(false);
            });

           
          };
          
          return (
            <div className="flex gap-4 flex-row">
              <FaKey 
              className=" text-gray-700 hover:cursor-pointer text-lg"
              />
              <FaEdit 
                onClick={handlepEdit}
                className=" text-blue-700 hover:cursor-pointer text-lg"
              />
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

  let fetchAllInstituteTeacher = async () => {
    setloading(true)
    let get;
    if (query === null || query === undefined) {
      get = await getInstituteTeacher(page);
    } else {
      get = await getInstituteTeacherSearch(query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          dt.push({
            id: index + 1,
            uuid: item.id,
            status: item.status,
            name: item.firstName + " " + item.lastName,
            email: item.email,
            phone: item.phone,
            DOB: dayjs(item.date).format('YYYY-MM-DD'),
            gender: item.gender,
          });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };

  if (props.name === "instituteTeacher") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 ,},
      { field: "email", headerName: "email", width: 240 ,},
      { field: "phone", headerName: "phone", width: 150 ,},
      { field: "DOB", headerName: "date of birth", width: 150 ,},
      { field: "gender", headerName: "gender", width: 100, },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params: any) => {
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await updateInstitueTeacherStatus(
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
              fetchAllInstituteTeacher();
            }
          };
          const handlepEdit = async () => {
            let  key = encryptUUID(params.row.uuid)
 
            navigate(`/institute/teacher/edit/${key}`)
          };
          const handlepDelete = async () => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this item! And also delete all data from this user',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async(result) => {
            setloading(true);

              if (result.isConfirmed) {
                const { message, status } = await deleteInstituteTeacher(
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
                  fetchAllInstituteTeacher();
                }
            setloading(false);

                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
              }
              setloading(false);
            });

           
          };
          
          return (
            <div className="flex gap-4 flex-row">
              <FaKey 
               className=" text-gray-700 hover:cursor-pointer text-lg"
               />
              <FaEdit 
                onClick={handlepEdit}
                className=" text-blue-700 hover:cursor-pointer text-lg"
              />
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

  let fetchAllInstituteCourses = async () => {
    setloading(true)
    let get;
    if (query === null || query === undefined) {
      get = await getInstituteCourses(page);
    } else {
      get = await getInstituteCoursesSearch(query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          dt.push({
            id: index + 1,
            uuid: item.id,
            status: item.status,
            name: item.name,
            image: item.image,
            amount: item.amount,
            duration:item.durantion,

          });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };

  if (props.name === "instituteCourses") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "image", headerName: "Image", width: 200,   editable: true,
      renderCell: (params:any) => <img width="70" height="70" className="rounded-[50%]" src={params.value} />, },
      { field: "amount", headerName: "Amount", width: 240 ,},
      { field: "duration", headerName: "Duration", width: 150 ,},
      { field: "subCourse" , headerName:"Sub Course", width: 120,  
       
      renderCell: (params:any) => 
      {
        const handleView = async () => {
          let  key = encryptUUID(params.row.uuid)
  
          navigate(`/institute/course/sub-course/view/${key}`)
        };
     return   <button onClick={handleView} className=" bg-blue-500 text-white px-2 py-1 rounded-full">view </button>
      }
    },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params: any) => {
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await updateInstitueCourseStatus(
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
              fetchAllInstituteCourses();
            }
          };
          const handlepEdit = async () => {
            let  key = encryptUUID(params.row.uuid)
 
            navigate(`/institute/course/edit/${key}`)
          };
          const handlepDelete = async () => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this item! And also delete all data from this Course',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async(result) => {
            setloading(true);

              if (result.isConfirmed) {
                const { message, status } = await deleteInstituteCourse(
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
                  fetchAllInstituteCourses();
                }
            setloading(false);

                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
              }
              setloading(false);
            });

           
          };
          const handleStudnetIcon = async () => {
            setOpen(!open);
            setModelDate({
              name:params.row.name,
              id:params.row.uuid,
              title:'CourseStudents'
            })
            // const get = await getSubCourseStudents(params.row.uuid)
          
        }
          
          return (
            <div className="flex gap-4 flex-row">
               <div>
                <FaUsers
                onClick={handleStudnetIcon}
                className=" text-blue-400 hover:cursor-pointer text-xl"
                /> 
              </div>
              <FaEdit 
                onClick={handlepEdit}
                className=" text-blue-700 hover:cursor-pointer text-lg"
              />
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

  let fetchAllInstituteSubCourses = async () => {
    setloading(true)
    let get;
    if (query === null || query === undefined || query === "") {
      get = await getInstituteSubCourses(page);
    } else {
      get = await getInstituteSubCoursesSearch(query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          dt.push({
            id: index + 1,
            uuid: item.id,
            status: item.status,
            name: item.name,
            image: item.image,
            amount: item.amount,
            duration:item.duration,
          });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };

  if (props.name === "instituteSubCourses") {
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
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await updateInstitueSubCourseStatus(
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
              fetchAllInstituteSubCourses();
            }
          };
          const handlepEdit = async () => {
            let  key = encryptUUID(params.row.uuid)
 
            navigate(`/institute/course/sub-course/edit/${key}`)
          };
          const handleStudnetIcon = async () => {
              setOpen(!open);
              setModelDate({
                name:params.row.name,
                id:params.row.uuid,
                title:"subCourseStudents"
              })
              // const get = await getSubCourseStudents(params.row.uuid)
            
          }
          const handlepDelete = async () => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this item! And also delete all data from this Course',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async(result) => {
            setloading(true);

              if (result.isConfirmed) {
                const { message, status } = await deleteInstituteSubCourse(
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
                  fetchAllInstituteSubCourses();
                }
            setloading(false);

                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
              }
              setloading(false);
            });

           
          };
          
          return (
            <div className="flex gap-4 flex-row">
              <div>
                <FaUsers
                onClick={handleStudnetIcon}
                className=" text-blue-400 hover:cursor-pointer text-xl"
                /> 
              </div>
              <FaEdit 
                onClick={handlepEdit}
                className=" text-blue-700 hover:cursor-pointer text-lg"
              />
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

  let fetchInstituteBatchs = async () => {
    setloading(true)
    let get;
    if (query === null || query === undefined || query === "") {
      get = await InstituteBatchGetAll(page);
    } else {
      get = await InstituteBatchSearch(query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          dt.push({
            id: index + 1,
            uuid: item.id,
            course:item?.subCourses?.name,
            status: item.status,
            name: item.name,
            liveClass:item.haveLiveClass,
            start_time: item.start_time,
            end_time: item.end_time,
            weekdays:item.weekdays,
          });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };

  if (props.name === "InstituteBatch") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "course", headerName: "Course Name", width: 150 },
      { field: "start_time", headerName: "Start Time", width: 140 ,},
      { field: "end_time", headerName: "End Time", width: 150 ,},
      {field:"weekdays",headerName:"Week days",width: 150},
      {field:"liveClass",headerName:"Live Class", width:120,
      renderCell: (params: any) => {
        let statusCheck = params.row.liveClass;
        const handleChange = async (event:any)=>{
          // const setLiveClassStatus
          const update:any = await InstituteBatchLiveClassStatus( params.row.uuid,
            !params.row.liveClass);
            if(update.status === "success"){
              statusCheck = !params.row.liveClass
            }
        }
        const handleLiveClassList = async (event:any)=>{
          console.log(params.row.uuid)
          const check:any = await InstituteLiveClassByBatch(params.row.uuid)
          if(check.status === "success"){
            console.log(check.message)
            setOpen(!open);
           setModelDate({
            name:"liveClass",
            data:check.message,
            batchid:params.row.uuid
           })
          }
        }
        return (
          <div className="flex gap-4 flex-row">
            <Switch   defaultChecked={params.row.liveClass}   onChange={handleChange} size="small"  />
            <FaList className=" text-xl mt-1 text-blue-500 hover:cursor-pointer" onClick={handleLiveClassList} />
          </div>
        );
      }
    },
      {
        field: "actions",
        headerName: "Actions",
        width: 350,
        renderCell: (params: any) => {
          const handlepUpdateStatus = async () => {
            setloading(true);
            const { message, status } = await InstituteBatchStatus(
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
              fetchInstituteBatchs();
            }
          };
          const handlepEdit = async () => {
            let  key = encryptUUID(params.row.uuid)
 
            navigate(`/institute/batch/edit/${key}`)
          };
          const handlepDelete = async () => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this item! And also delete all data from this Course',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async(result) => {
            setloading(true);

              if (result.isConfirmed) {
                const { message, status } = await deleteInstituteSubCourse(
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
                  fetchInstituteBatchs();
                }
            setloading(false);

                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
              }
              setloading(false);
            });

           
          };
          const handleStudent =async ()=>{
            let  id:string = encryptUUID(params.row.uuid)
            navigate(`/institute/batch/students/${id}`);
          }
          const handleTeacher =async ()=>{
            setOpen(!open);
            const getActiveTeacher = await getbatchTeacher(params.row.uuid)
            if(getActiveTeacher.status === 'success'){
              setModelDate({
                name:params.row.name,
                id:params.row.uuid,
                code:"teacher",
                title:"activeTeacher",
                activeTeacher:`${getActiveTeacher?.message[0]?.teacherId?.firstName ? getActiveTeacher?.message[0]?.teacherId?.firstName : null} ${getActiveTeacher?.message[0]?.teacherId?.lastName ? getActiveTeacher?.message[0]?.teacherId?.lastName : null}`
              })
            }
           
          }
          return (
            <div className="flex gap-4 flex-row">
              <button onClick={handleStudent} className=" bg-blue-800 text-white rounded-full px-2 py-1">
                students
              </button>
              <button onClick={handleTeacher} className=" bg-red-300 text-white rounded-full px-2 py-1">
                Teacher
              </button>
              <FaEdit 
                onClick={handlepEdit}
                className=" text-blue-700 hover:cursor-pointer text-lg"
              />
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


  let batchStudents = async () => {
    setloading(true)
    let get;
    if (query === null || query === undefined || query === "") {
      get = await getBatchStudents(props?.id,page);
    } else {
      get = await getBatchStudentsSearch(props?.id,query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          dt.push({
            id: index + 1,
            uuid: item.id,
            name:item?.stundetmaster?.firstName+ ' ' +item?.stundetmaster?.lastName,
            email:item?.stundetmaster?.email,
            phone:item?.stundetmaster?.phone,
          });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };

  if (props.name === "batchStudents") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "email", width: 200 },
      { field: "phone", headerName: "phone", width: 140 ,},
      {
        field: "actions",
        headerName: "Actions",
        width: 250,
        renderCell: (params: any) => {
          const handlepDelete = async () => {
            Swal.fire({
              title: 'Are you sure?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async(result) => {
            setloading(true);

              if (result.isConfirmed) {
                const { message, status } = await deleteBatchStudent(
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
                  fetchInstituteBatchs();
                }
            setloading(false);

                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
              }
              setloading(false);
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
        },
      },
    ];
  }


  let teacherBatchAssignment = async () => {
    setloading(true)
    let get;
    if (query === null || query === undefined || query === "") {
       get = await TeacherBatchAssignmentGet(props.dataId!);
    } else {
      get = await TeacherBatchAssignmentSearchGet(props.dataId!,query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
          let submissions = item.batchStudentsAssignment
      dt.push({
        id: index + 1,
        name: item.name,
        uuid: item.id,
        media: item.media,
        contents: item.contents,
        submission_date:item.submission_date,
        assignment_date:item.assignment_date,
        submission:submissions.length,
        students:item.batchMaster.batchLink.length
      });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };

  if (props.name === "teacherBatchAssignment") {
    columns = [
      { field: "id", headerName: "ID", width: 20 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "assignment_date", headerName: "Date ", width: 130,
      renderCell: (params: any) => {
        let date = moment(params.row.assignment_date,'YYYY-MM-DD').format('DD/MMM/YYYY')
        return date 
      } 
      },
      { field: "submission_date", headerName: "Submision date ", width: 130,
      renderCell: (params: any) => {
        let date = moment(params.row.submission_date).format('DD/MMM/YYYY')
        return date 
      }
     },
      { field: "media", headerName: "media ", width: 150 ,
      renderCell: (params: any) => {
         let html:any = [];
        let spit:any = params.row.media.split(',');
          if(spit.length > 0){
            spit.map(async(item:any,index:number)=>{
              let checkURL =  isUrl(item);
              if(checkURL){
                const lastPartAfterLastDot =  getLastpartFromString('.',item);
                html.push({
                  link:item,
                  ext:lastPartAfterLastDot
                })
              }
             })
          }
        return <>
         <div className="flex gap-2">
            {
              html.length > 0 ? (
                html.map((item:any,index:number)=>(
                  item.ext === "exe" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-gray-500 text-white p-1 rounded-md"  >
                    <FaStop />
                    </a>
                    </div>
                  ) : 
                  item.ext === "mp4" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaVideo />
                    </a>
                   </div>
                  ) : item.ext === "mp3" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaAudible />
                    </a>
                    </div>
                  ):  item.ext === "pdf" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaFilePdf />
                    </a>
                    </div>
                  ):  item.ext === "docx" ? (
                    <div key={index} className="flex gap-2 "> 
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaFileWord />
                    </a>
                    </div>
                  ): (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaStar />
                    </a>
                    </div>
                  )
                                    
                ))
              ):null
            }
            </div>
            </>
      }
      },
      { field: "contents", headerName: "contents ", width: 150, 
      renderCell: (params: any) => {
        let trucate = truncateHTMLChar(params.row.contents,15);
        console.log(trucate)
        return (

          <Tooltip title={ReactHtmlParser(params.row.contents)} arrow >
            <div dangerouslySetInnerHTML={{ __html: trucate }} />
          </Tooltip>
        )
      }
      },
      { field: "submission", headerName: "submissions ", width: 130 ,
      renderCell: (params: any) => {
        return <>
          <div className="flex gap-2">
            <div className="py-1 px-2 rounded-md bg-dark-blue text-white">
              {
                params.row.submission
              }/
              {
              params.row.students
              }
           
            </div>
            <FaEye className="text-dark-purple hover:cursor-pointer text-3xl rounded-lg p-1" />
          </div>
        </> 
      }
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 300,
        renderCell: (params: any) => {
            const handleShow = async()=>{
              navigate(`/teacher/batches/assignment/edit/${params.row.uuid}`);
              // const get = await TeacherBatchesAssignmentShow()
            }
            const handleDelete = async()=>{
              Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
              }).then(async(result) => {
              setloading(true);
  
                if (result.isConfirmed) {
                  const { message, status } = await TeacherBatchesAssignmentDelete(params.row.uuid)
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
                    teacherBatchAssignment();
                  }
              setloading(false);
  
                  Swal.fire('Deleted!', 'The item has been deleted.', 'success');
                }
                setloading(false);
              });
             
            }
          return (
            <div className="flex gap-2 flex-row">
              <FaEye onClick={handleShow} className="text-xl text-blue-600 hover:cursor-pointer " />
              <FaTrash onClick={handleDelete} className=" text-xl text-red-600 hover:cursor-pointer " />
            </div>
          );
        },
      },
    ];
  }

  let studentBatchAssignment = async () => {
    setloading(true)
    let get;
    if (query === null || query === undefined || query === "") {
       get = await StudentBatchAssignmentGet(props.dataId!);
    } else {
      get = await StudentBatchAssignmentGetSearch(props.dataId!,query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: number) => {
      dt.push({
        id: index + 1,
        name: item.name,
        uuid: item.id,
        media: item.media,
        contents: item.contents,
        submission_date:item.submission_date,
        assignment_date:item.assignment_date,
        submit:item.batchStudentsAssignment
      });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };

  if (props.name === "studentBatchAssignment") {
    columns = [
      { field: "id", headerName: "ID", width: 20 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "assignment_date", headerName: "Date ", width: 130,
      renderCell: (params: any) => {
        let date = moment(params.row.assignment_date,'YYYY-MM-DD').format('DD/MMM/YYYY')
        return date 
      } 
      },
      { field: "submission_date", headerName: "Submision date ", width: 130,
      renderCell: (params: any) => {
        let date = moment(params.row.submission_date).format('DD/MMM/YYYY')
        return date 
      }
     },
      { field: "media", headerName: "media ", width: 150,
      renderCell: (params: any) => {
        let html:any = [];
        let spit:any = params.row.media.split(',');
          if(spit.length > 0){
          
            spit.map(async(item:any,index:number)=>{
              let checkURL =  isUrl(item);
              if(checkURL){
                const lastPartAfterLastDot =  getLastpartFromString('.',item);
                html.push({
                  link:item,
                  ext:lastPartAfterLastDot
                })
              }
             })
            
          }
        return <>
          <div className="flex gap-2">
            {
              html.length > 0 ? (
                html.map((item:any,index:number)=>(
                  item.ext === "exe" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-gray-500 text-white p-1 rounded-md"  >
                    <FaStop />
                    </a>
                    </div>
                  ) : 
                  item.ext === "mp4" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaVideo />
                    </a>
                   </div>
                  ) : item.ext === "mp3" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaAudible />
                    </a>
                    </div>
                  ):  item.ext === "pdf" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaFilePdf />
                    </a>
                    </div>
                  ):  item.ext === "docx" ? (
                    <div key={index} className="flex gap-2 "> 
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaFileWord />
                    </a>
                    </div>
                  ): (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaStar />
                    </a>
                    </div>
                  )
                                    
                ))
              ):null
            }
            </div>
            </>
      }
      },
      { field: "contents", headerName: "contents ", width: 150, 
      renderCell: (params: any) => {
        let trucate = truncateHTMLChar(params.row.contents,15);
        console.log(trucate)
        return (

          <Tooltip title={ReactHtmlParser(params.row.contents)} arrow >
            <div dangerouslySetInnerHTML={{ __html: trucate }} />
          </Tooltip>
        )
      }
      },
      // { field: "submission", headerName: "submissions ", width: 100 ,
      // renderCell: (params: any) => {
      //   return `${params.row.submission}/${params.row.students}` 
      // }
      // },
      {
        field: "actions",
        headerName: "Actions",
        width: 300,
        renderCell: (params: any) => {
          return (
            <div className="flex gap-4 flex-row">
              {
                params.row.submit.length > 0 ?
                <button disabled={true}  className=" px-3 py-2 text-white bg-yellow-600 rounded-lg">
                uploaded
                </button>
                 :
                 (
                <button  onClick={(()=>navigate(`/student/batches/assignment/upload/${params.row.uuid}`))} className=" px-3 py-2 text-white bg-blue-600 rounded-lg">
                  upload
              </button>
                 )
              }
            </div>
          );
        },
      },
    ];
  }


  const [rowCountState, setRowCountState] = useState(totalRow || 0);
  useEffect(() => {
    if (props.name === "instituteStudents") {
      fetchAllInstituteStudents();
      setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState
    );
    }
    if (props.name === "instituteTeacher") {
      fetchAllInstituteTeacher();
      setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState
    );
    
    }
    if (props.name === "instituteCourses") {
      fetchAllInstituteCourses();
      setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState
    );
    }
    if (props.name === "instituteSubCourses") {
      fetchAllInstituteSubCourses();
      setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState
    );
    } 
    if (props.name === "InstituteBatch") {
      fetchInstituteBatchs();
      setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState
    );
   
    }
    if (props.name === "batchStudents") {
      batchStudents();
      setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState
    );
    }
    if (props.name === "teacherBatchAssignment") {
      teacherBatchAssignment();
      setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState
    );
    }
    if (props.name === "studentBatchAssignment") {
      studentBatchAssignment();
      setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState
    );
    }
    
    
    
  }, [props.refresh, page, pageSize, totalRow, query]);
  const onPaginationModelChange = (paginationModel: any) => {
    setPage(paginationModel.page + 1);
    setPaginationModel(paginationModel);
  };
  const onFilterChange = (filterModel: any) => {
    if(filterModel.quickFilterValues.length > 0){
    console.log(filterModel.quickFilterValues.join(' '));
      setQuery(filterModel.quickFilterValues.join(' '));
    }else{
      setQuery(null)  ;
    }
  };
  return (
    <>
      {/* { loading ? (
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ background: "gray", width: 1 }}
          height={props.height ? props.height : 400}
        />
      ) : ( */}
        <Box
          sx={{ height: props.height ? props.height : 400, width: 1 }}
          className={` shadow-md rounded-xl p-2 bg-gray-50`}
        >
          <DataGrid
            sx={{ border: 0, width:1}}
            rows={tableRow}
            filterMode="server"
            onFilterModelChange={onFilterChange}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                
              },
            }}
          
            rowCount={rowCountState}
            columns={columns}
            loading={loading}
            paginationMode="server"
            paginationModel={paginationModel}
            // onPaginationModelChange={setPaginationModel}
            onPaginationModelChange={onPaginationModelChange}

            // Set the total row count
          />
        </Box>

        <Basicmodel isOpen={open} isClode={setOpen} name={modelData.name} >
          {
            props.name === 'InstituteBatch' && modelData?.activeTeacher !== 'null null' && modelData?.code === 'teacher'  ? 
            (
              <>
              <div className=" flex flex-row bg-blue-300 justify-between p-2 rounded-xl">
                <b>Active Teacher : <span>{modelData?.activeTeacher}</span>  </b> 
                <FaTrash  className="mt-1 ml-4 text-red-700 hover:cursor-pointer" />
              </div>
              <DataGrids name={modelData.title} background={`rounded-xl p-2 bg-gray-50`} dataid={modelData.id} refresh={render} />
              </>

            ):null
          }
          {
            props.name === 'InstituteBatch' && modelData?.name === 'liveClass'   ? 
            (
              modelData?.data[0]?.meeting_number ?
              <>
              <div className=" bg-blue-100 p-2 rounded-md">
              <p className="text-lg font-bold">Live Class Details</p>
               <p>Meeting Number : {modelData?.data[0]?.meeting_number}</p>
               <p>Meeting password : {modelData?.data[0]?.password}</p>
               <p>Meeting URL : {modelData?.data[0]?.meeting_url}</p>
              </div>
              </>
              :
              <>
              <button onClick={()=>handleLiveClassCreate(modelData?.batchid)} className="px-4 py-2 bg-dark-purple text-white  font-bold text-xl rounded-xl">create live class ?</button>
              </>
            ):null
          }
        </Basicmodel>
      {/* // ) */}
      {/* } */}
    </>
  );
}

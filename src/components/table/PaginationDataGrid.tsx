import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import {
  deleteCountry,
  getActiveCountry,
  updateCountryStatus,
} from "../../service/admin/location/country.service";
import { FaEdit, FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
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
export default function PaginationDataGrid(props: {
  name: String;
  refresh?: number;
  height?: string;
}) {
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
          
          return (
            <div className="flex gap-4 flex-row">
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
          sx={{ height: props.height ? props.height : 400, width: 1, flex:1 }}
          className={` shadow-md rounded-xl p-2 bg-gray-50`}
        >
          <DataGrid
            sx={{ border: 0 }}
            rows={tableRow}
            filterMode="server"
            onFilterModelChange={onFilterChange}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
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
      {/* // ) */}
      {/* } */}
    </>
  );
}

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
import {
  deleteInstituteStudent,
  getInstituteStudents,
  getInstituteStudentsSearch,
  updateInstitueStundetStatus,
} from "../../service/institute/student.service";

export default function PaginationDataGrid(props: {
  name: String;
  refresh?: number;
  height?: string;
}) {
  const [loading, setloading] = useState<boolean>(true);
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
            setloading(false);
          };
          const handlepDelete = async () => {
            setloading(true);
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
  const [rowCountState, setRowCountState] = useState(totalRow || 0);
  useEffect(() => {
    if (props.name === "instituteStudents") {
      fetchAllInstituteStudents();
    }

    setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState
    );
  }, [props.refresh, page, pageSize, totalRow, query]);
  const onPaginationModelChange = (paginationModel: any) => {
    setPage(paginationModel.page + 1);
    setPaginationModel(paginationModel);
  };
  const onFilterChange = (filterModel: any) => {
    console.log(filterModel.quickFilterValues[0]);
    setQuery(filterModel.quickFilterValues[0]);
  };
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
      )}
    </>
  );
}

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

export default function DataGrids(props: {
  name: String;
  refresh?: number;
  height?: string;
}) {
  const [loading, setloading] = useState<boolean>(true);
  let columns: any = [];
  let [tableRow, settableRow] = useState([]);

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
  }, [props.refresh]);

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
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

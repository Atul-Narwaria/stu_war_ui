import Box from "@mui/material/Box";
import {
  DataGrid,
  GridRowSelectionModel,
  GridToolbar,
  
} from "@mui/x-data-grid";
import {  useEffect, useState } from "react";
import { getInstituteStudentsActive, getInstituteStudentsSearch } from "../../service/institute/student.service";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaMinus } from "react-icons/fa";


export default function SelectPaginationDataGrid(props: {
     name:string, 
     onSubmit:any,
      height?:number,
      dateRange?:boolean,
      id?:string
}) {
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
  const [rowCountState, setRowCountState] = useState(totalRow || 0);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const [selectedRows, setSelectedRows] = useState<any>([]);

  const [rowid, setRowid] = useState<any>(1)
  let batchStudentAdd = async () => {
    setloading(true)
    let get;
    if (query === null || query === undefined) {
      get = await getInstituteStudentsActive(page);
    } else {
      get = await getInstituteStudentsSearch(query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        let ids:number = 1;
        get.message?.map((item: any, index: any) => {
          dt.push({
            id: index+rowid,
            uuid: item.id,
            status: item.status,
            name: item.firstName + " " + item.lastName,
            email: item.email,
            phone: item.phone,
            create:item.createAt,
          });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };

  if (props.name === "batchStudentAdd") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 300 ,},
      { field: "email", headerName: "email", width: 340 ,},
      { field: "phone", headerName: "phone", width: 350 ,},
      
    ];
  }


  let courseStudentAdd = async () => {
    setloading(true)
    let get;
    if (query === null || query === undefined) {
      get = await getInstituteStudentsActive(page);
    } else {
      get = await getInstituteStudentsSearch(query);
    }
    setTotalPages(get.totalPage * pageSize);
    setTotalRow(get.totalRow);
    let dt: any = [];
    if (get?.status == "success") {
      if (get?.message) {
        get.message?.map((item: any, index: any) => {
          dt.push({
            id: index+rowid,
            uuid: item.id,
            status: item.status,
            name: item.firstName + " " + item.lastName,
            email: item.email,
            phone: item.phone,
            create:item.createAt,
          });
        });
      }
    }
    setloading(false);
    settableRow(dt);
  };

  if (props.name === "courseStudentAdd") {
    columns = [
      { field: "id", headerName: "ID", width: 10 },
      { field: "name", headerName: "Name", width: 300 ,},
      { field: "email", headerName: "email", width: 340 ,},
      { field: "phone", headerName: "phone", width: 250 ,},
      {field:"create",headerName: "createAt", width:100,
      renderCell: (params: any) => {

        var now = dayjs()
        var userDate:any = dayjs(params.value).format('DD-MM-YYYY');
       if(dayjs(params.value,'YYYY-MM-DD').format('YYYY-MM-DD') === dayjs(now,'YYYY-MM-DD').format('YYYY-MM-DD')){
          userDate = "Today";
       }else  if(dayjs(params.value,'YYYY-MM-DD').format('YYYY-MM-DD') === dayjs(now,'YYYY-MM-DD').add(-1,'day').format('YYYY-MM-DD')){
        userDate = "Yesterday";
       }
        return (
          <>
          {
            userDate === 'Today' ? <p className=" bg-primary text-white px-2 py-1 rounded-full ">{userDate}</p> : userDate === 'Yesterday' ? <p className=" bg-yellow-600
            text-white px-2 py-1 rounded-full">{userDate}</p> : <p className="text-white px-2 py-1 rounded-full bg-gray-600">{userDate}</p>
          }
          </>
        )
      }
    }
    ];
  }

 


  useEffect(() => {
    if(props.name === 'batchStudentAdd'){
      // setRowSelectionModel([1,2,3,4,12,18])
        batchStudentAdd();
        setRowCountState((prevRowCountState) =>
        totalRow !== undefined ? totalRow : prevRowCountState);
    }
    if(props.name === 'courseStudentAdd'){
      courseStudentAdd();
      setRowCountState((prevRowCountState) =>
      totalRow !== undefined ? totalRow : prevRowCountState);
    }
    
   
  }, [ page, pageSize, totalRow, query]);
  useEffect(() => {
    
    // console.log(rowSelectionModel);
    const selectedData = rowSelectionModel.map((id:any) => tableRow.find((item:any, index:number) => item.id === id));
    props.onSubmit(selectedData);
  },[rowSelectionModel])


  const onPaginationModelChange = (paginationModel: any) => {
    if(rowSelectionModel.length > 0) {
      setRowSelectionModel([...rowSelectionModel])
    }
    // if(rowSelectionModel){

    // }
    // localStorage.setItem('batchAddUser', JSON.stringify(rowSelectionModel));
    setPage(paginationModel.page + 1);
    setRowid(10*paginationModel.page+1);
    setPaginationModel(paginationModel);

  };
  const onFilterChange = (filterModel: any) => {
    if(filterModel.quickFilterValues.length > 0){
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
          sx={{ height: props.height ? props.height : 450, width: 1, flex:1 }}
          className={` bg-white p-3 `}
        >
           {
            props.dateRange ? 
            (
              <>
              <small>
              select date
              </small>
              <div className="flex gap-1 relative md:absolute">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              slotProps={{ textField: { size: 'small', sx:{width:150} } }}
              defaultValue={dayjs('2022-04-17')} 
              />
              </LocalizationProvider>
              <FaMinus className="mt-3 text-gray-400"  />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              slotProps={{ textField: { size: 'small', sx:{width:150} } }}
              defaultValue={dayjs('2022-04-17')} />
              </LocalizationProvider>
              </div>
              </>
            ) : 
          null

           }


          <DataGrid
            sx={{ border: 0,height:400 }}
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
           
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel:any) => {
              // const seletedId:any = tableRow.filter((row:any)=> row.id === newRowSelectionModel[0])
              //    setRowSelectionModel(seletedId);
              if(newRowSelectionModel.length > 0) {
                
                setRowSelectionModel([...newRowSelectionModel]);

              }
              }}
              keepNonExistentRowsSelected={true}
            rowCount={rowCountState}
            columns={columns}
            loading={loading}
            paginationMode="server"
            paginationModel={paginationModel}
            // onPaginationModelChange={setPaginationModel}
            onPaginationModelChange={onPaginationModelChange}
            rowSelectionModel={rowSelectionModel}
            className="no-export-button"
            // Set the total row count
          />
        </Box>
      {/* // ) */}
      {/* } */}
    </>
  );
}

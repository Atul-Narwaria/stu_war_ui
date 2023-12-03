import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,

} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import Skeleton from "@mui/material/Skeleton";

import { TeacherAllBatches, TeacherAllBatchesStudents } from "../../service/teacher/teacherBatch.service";

export default function DataTableShow(props: {
  name: string;
  id?: string;
  refresh?: number;
  height?: string;
  dataid?:string;
  background?:any
}) {
  
  const [render, setRender] = useState(0)
  const [modelData, setModelDate] = useState<any>([]);
  let id:string = "NA";
  if(props.id){
    id = props.id;
  }
  const [loading, setloading] = useState<boolean>(true);
  let columns: any = [];
    let [tableRow, settableRow] = useState([]);
 

  

  let teacherbatchesStudents = async () => {
    console.log(props.dataid)
    const get:any = await TeacherAllBatchesStudents(props.dataid!)
    let dt: any = [];
    console.log(get.message)
    let datas= get.message[0].batchId.batchLink;
  
    datas.map((item: any, index: number) => {
        console.log(item.stundetmaster.email)
      dt.push({
        id: index + 1,
        uuid: item.stundetmaster.id,
        name:item.stundetmaster.firstName+' '+item.stundetmaster.lastName,
        email:item.stundetmaster.email,
        phone:item.stundetmaster.phone
      });
    });
    setloading(false);
    settableRow(dt);
  };
  if (props.name === "teacherbatchesStudents") {
    columns = [
      { field: "id", headerName: "ID", width: 20 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "Email ", width: 300 },
      { field: "phone", headerName: "Phone ", width: 200 },
      
    ];
  }
  
  useEffect(() => {
    if(props.name === "teacherbatchesStudents"){
      teacherbatchesStudents();
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
          className={props.background ? props.background : ` shadow-md rounded-xl p-2 bg-gray-50`}
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

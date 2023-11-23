import React, { useEffect, useState } from 'react';
import { DataGrid, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { Box, Skeleton } from '@mui/material';

export default function DataTable(props:{name:string, data:any,  onSubmit:any, height?:number}) {
    const [loading, setloading] = useState<boolean>(false);
    let [tableRow, settableRow] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  

    useEffect(()=>{
        if(props.name === 'linkCourse'){
            let dt:any= [];
            if(props.data.length>0){
                props.data?.map((item: any, index: number) => {
                    dt.push({
                      id: index + 1,
                      name: item.name,
                      uuid: item.id,
                     
                    });
                  });
            }
            setloading(false);
        settableRow(dt);
        }
    },[ props.data])

  useEffect(() => {
    const selectedData = rowSelectionModel.map((id:any) => props.data.find((item:any, index:number) => index === parseInt(id)-1));
    props.onSubmit(selectedData);
  },[rowSelectionModel])
  let columns: any = [];
    if(props.name === 'linkCourse'){
        columns = [
            {
              field: 'id',
              headerName: 'ID',
              width: 100,
            },
            {
              field: 'name',
              headerName: 'Sub Course Name',
              width: 400,
            },
          ];
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
        <div
        //   sx={{ height: props.height ? props.height : 400, width: 1 }}
          className={` ${props.height ? `h-[${props.height}]` : `h-[400]`}  p-2 bg-white`}
        >
<DataGrid
        rows={tableRow}
        sx={{ border: 0 }}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            
      />
      {/* {
        submit ? 
         (
          <div className="my-2">
          <button onClick={handleSubmit} className=' bg-primary px-3 py-2 w-full text-white rounded-lg  '>Confirm </button>
          </div>
         ) : null
      } */}
      </div>
    )}
    </>
  );
}

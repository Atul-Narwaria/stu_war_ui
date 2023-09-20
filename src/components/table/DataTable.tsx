import React, { useEffect, useState } from 'react';
import { DataGrid, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { Box, Skeleton } from '@mui/material';

export default function DataTable(props:{name:string, data:any, onSubmit:any, height?:number}) {
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

  const handleSubmit = () => {
    // Get the selected data based on the selected row IDs
    const selectedData = rowSelectionModel.map((id:any) => props.data.find((item:any) => item.uuid === id.uuid));

    // Send the selected data to the server
    props.onSubmit(selectedData);
  };
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
          className={` ${props.height ? `h-[${props.height}]` : `h-[400]`} shadow-md rounded-xl p-2 bg-gray-50`}
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
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            
      />

        <div className='my-3'>
        <button onClick={handleSubmit} className=' bg-primary text-white py-2 px-3 rounded w-full' >Link Course</button>
        </div>
        </div>
    )}
    </>
  );
}

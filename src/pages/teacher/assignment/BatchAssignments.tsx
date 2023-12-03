import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import DataGrids from '../../../components/table/DataGrids'
import { TeacherBatchesDetail } from '../../../service/teacher/teacherBatch.service';
import { useNavigate, useParams } from 'react-router-dom';
import PaginationDataGrid from '../../../components/table/PaginationDataGrid';

export default function BatchAssignments() {
    const params:any = useParams();
    const navigate:any = useNavigate();
    const [batchDetail, setBatchDetail] = useState<any>(null);
    useEffect(()=>{
        handlebatchDetail();
      },[])
      const handlebatchDetail = async ()=>{
        const get = await TeacherBatchesDetail(params.id)
        if(get.status === "success"){
          setBatchDetail(get.message)
        }
      }
  return (
    <>
    <Breadcrumb name={`Assignments - ${batchDetail?.name}`}>
      <button onClick={(()=>navigate(`/teacher/batches/assignemnt/upload/${batchDetail.id}`))}  className=' text-white bg-blue-900 px-3 py-2 rounded-lg'>
        upload Assignments
      </button>
    </Breadcrumb>
    <div className="my-2">
        <PaginationDataGrid name="teacherBatchAssignment"  dataId={params.id}  />
    </div>
    </>
  )
}

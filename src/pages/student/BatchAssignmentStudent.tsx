import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DataGrids from '../../components/table/DataGrids'
import { TeacherBatchesDetail } from '../../service/teacher/teacherBatch.service';
import { useParams } from 'react-router-dom';
import PaginationDataGrid from '../../components/table/PaginationDataGrid';
import { StudentBatchDetailById } from '../../service/student/studentBatch.service';

export default function BatchAssignments() {
    const params:any = useParams();
    const [batchDetail, setBatchDetail] = useState<any>(null);
    useEffect(()=>{
        handlebatchDetail();
      },[])
      const handlebatchDetail = async ()=>{
        const get = await StudentBatchDetailById(params.id)
        if(get.status === "success"){
          setBatchDetail(get.message)
        }
      }
  return (
    <>
    <Breadcrumb name={`Assignment - ${batchDetail?.name}`}>
    </Breadcrumb>
    <div className="my-2">
        <PaginationDataGrid name="studentBatchAssignment"  dataId={params.id}  />
    </div>
    </>
  )
}

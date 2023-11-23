import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import { getInstituteBatchById } from '../../../service/institute/batch.service';
import { decryptUUID, encryptUUID } from '../../../helper/encryptionKey';
import { useNavigate, useParams } from 'react-router-dom';
import PaginationDataGrid from '../../../components/table/PaginationDataGrid';

export default function BatchStudent() {
    const URLParams:any = useParams();
    const navigate = useNavigate()
    const [BatchDetail, setBatchDetail] = useState<any>(null);
    useEffect(()=>{
        const fetch = async()=>{
            const getbatchData  = await getInstituteBatchById(decryptUUID(URLParams.id));
            if(getbatchData){
                setBatchDetail(getbatchData?.message);
            }
          
        }
        fetch();
    },[])
    let decryptId:any = decryptUUID(URLParams.id);
  return (
   <>
    <Breadcrumb name={`${BatchDetail?.name} Batch  Student`}>
    <button
          onClick={() => navigate(`/institute/batch/students/add/${encryptUUID(decryptId)}`)}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add Students
        </button>
       
    </Breadcrumb>
    <div className="mt-3">
        <PaginationDataGrid id={decryptUUID(URLParams.id)} height={500} name="batchStudents" />
      </div>
   </>
  )
}

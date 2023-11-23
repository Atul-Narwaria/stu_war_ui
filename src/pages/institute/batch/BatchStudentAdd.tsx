import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { getInstituteBatchById, linkBulkStudents } from '../../../service/institute/batch.service';
import { decryptUUID } from '../../../helper/encryptionKey';
import Breadcrumb from '../../../components/Breadcrumb';
import SelectPaginationDataGrid from './../../../components/table/SelectPaginationDataGrid';
import { toast } from 'react-toastify';

export default function BatchStudentAdd() {

    const URLParams:any = useParams();
    const [BatchDetail, setBatchDetail] = useState<any>(null);
    const [studentList, setStudentList] = useState<any>([]);

  const [selectedStudentList, setSelectedStudentList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);   

    useEffect(()=>{
        const fetch = async()=>{
            const getbatchData  = await getInstituteBatchById(decryptUUID(URLParams.id));
            if(getbatchData){
                setBatchDetail(getbatchData?.message);
            }
        }
        fetch();
    },[])

    const navigate = useNavigate();
    const handleDataSubmit = (selectedData:any) => {
        let ids:any = [];
        if(selectedData.length>0){
          selectedData.map((e:any)=>{
            ids.push(e.uuid);
          })
        }    
        setSelectedStudentList(ids)
      };
      const handleSubmit = async()=>{
        setIsLoading(true)
        let batchId = decryptUUID(URLParams.id);
        if(selectedStudentList.length === 0){
          toast.error("Sub Course required", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setIsLoading(false)
          return false;
        }
        let data:any = [];
        selectedStudentList.map((e:any)=>{
          data.push({
            fk_student_id:e,
            fk_batch_id:batchId
          });
        });

        const { message, status } = await linkBulkStudents(
         data
        );
          if(status === 'success'){
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
      
           navigate(`/institute/batch/students/${URLParams.id}`) 
            setIsLoading(false);
          }else{
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
            setIsLoading(false);
          }
        setIsLoading(false);
      }
  return (
    <>
    <Breadcrumb  name={`${BatchDetail?.name} Batch  Add Students`}></Breadcrumb>
    <div className={`my-2`}>
    <SelectPaginationDataGrid name="batchStudentAdd"  onSubmit={handleDataSubmit}  />
    </div>
  
    <div className="my-2">
            <button onClick={handleSubmit} disabled={isLoading ? true : false} className=' bg-primary px-3 py-2 w-full text-white rounded-lg  '>
                {
                    isLoading ? "Adding" : "Add Student"
                }  </button>
          </div>
    </>
  )
}

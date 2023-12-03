import React, { useEffect, useState } from 'react'
import DropZoneUpload from '../../../components/dropzone/DropZoneUpload';
import TinyMice from '../../../components/editor/TinyMice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { TeacherBatchAssignmentCount, TeacherBatchAssignmentSubmit, TeacherBatchesDetail } from '../../../service/teacher/teacherBatch.service';
import { getInstituteBatchById } from '../../../service/institute/batch.service';
import Breadcrumb from '../../../components/Breadcrumb';
import BreadcrumbText from '../../../components/BreadcrumbText';
import Upload from '../../../components/upload/Upload';
import { TextField } from '@mui/material';

export default function BatchAssignmentUpload() {
  
    const params:any = useParams();
    const navigate = useNavigate();
    const [uploadedFiles, setUploaded] = useState<any>([]);
    const [activeTab, setActivetab] = useState<any>(0);
    const [checkUploadedFilesStatus, setCheckUploadedFilesStatus] = useState<any>(false);
    const [content, setContent] = useState<any>(null);
    const [name,setName] = useState<any>(null);
    const [batchDetail, setBatchDetail] = useState<any>(null);
    const [submissionDate , setSubmissionDate] = useState<any>(null)
    const handleContentChange = (newContent: string) => {
      setContent(newContent);
    };
    
    useEffect(()=>{
      handlebatchDetail();
    },[])
   
    const handlebatchDetail = async ()=>{
      const get = await TeacherBatchesDetail(params.batchid)
      if(get.status === "success"){
        setBatchDetail(get.message)
      }
    }
    
    const handleSubmit = async()=>{
      if( submissionDate === null){
        return toast.error("submission date  required", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
         });
       }
       if( uploadedFiles.length === 0 && content=== null){
        return toast.error("remaks and files can not be both null  required", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
         });
       }
       let files = '';
    if(uploadedFiles.length > 0){
      uploadedFiles.map((e:any,index:number)=>{
        if(index === uploadedFiles.length-1){
          files += e
      }else if(index === 0){
        files = e+','
      }
      else if(uploadedFiles.length-1 !== index ){
        files += e+',';
      }else if(uploadedFiles.length-1 == index){
        files += e
      }
      })
    }
    if(name === null){
      return toast.error("Assigment name required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  
    const create:any = await TeacherBatchAssignmentSubmit(name,content,params.batchid, submissionDate,files)
    if(create.status !== 'success'){
      return toast.error(create.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    toast.success(create.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/teacher")
    }
    
  return (
   <>
    <BreadcrumbText name={`Upload Task/Assignment for ${batchDetail?.name}`} />
      
    <div className=' bg-white p-2 rounded-xl my-2'>
    <div className='p-2 rounded-lg min-h-[400px]'>
      <div className='ml-3 text-sm'> 
      <TextField
        size='small'
        sx={{ 
          width:1,
          marginBottom:2
         }}
                        label="Name *"
                        onChange={((e:any)=>setName(e.target.value))}
                      />
      </div>
      <div>
      <p className='ml-3 text-sm'>Upload files</p>
        <DropZoneUpload status={setCheckUploadedFilesStatus} data={setUploaded} />
     
        <div className='my-3'></div>
        <p className='ml-3 text-sm'>Remarks</p>
        <TinyMice height={300} value={content} onChange={handleContentChange} />
      </div>
        <div className='my-3'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  sx={{ 
                    width: '100%',
                   }}
                    label="submission date *"
                    defaultValue={dayjs().add(3,'days')}
                    disablePast
                    onChange={(date: any) => {
                      setSubmissionDate(
                        `${date?.year()}-${date?.month()}-${date?.date()}`
                      );
                    }}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        error: submissionDate === null ? true : false,
                        helperText: submissionDate === null ? "submissionDate required" : null,
                      },
                    }}
                  />
                </LocalizationProvider>
        </div>
        <button onClick={handleSubmit} className='w-full text-white bg-primary p-3 rounded-lg'>Submit</button>
    </div>

    </div>
   
   </>
  )
}

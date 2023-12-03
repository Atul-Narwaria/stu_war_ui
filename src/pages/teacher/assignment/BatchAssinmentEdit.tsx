import React, { useEffect, useState } from 'react'
import TinyMice from '../../../components/editor/TinyMice';
import { useNavigate, useParams } from 'react-router-dom';
import {  TeacherBatchesAssignmentShow } from '../../../service/teacher/teacherBatch.service';
import BreadcrumbText from '../../../components/BreadcrumbText';
import { getLastpartFromString, isUrl } from '../../../helper/Url';
import { FaAudible, FaFilePdf, FaFileWord, FaStar, FaStop, FaVideo } from 'react-icons/fa';

export default function BatchAssinmentEdit() {
  
    const params:any = useParams();
    const navigate = useNavigate();
    const [uploadedFiles, setUploaded] = useState<any>([]);
    const [content, setContent] = useState<any>(null);
    const [submissionDate , setSubmissionDate] = useState<any>()
    const [assignemntDetail , setAssignemntDetail] = useState<any>(null)
    const handleContentChange = (newContent: string) => {
      setContent(newContent);
    };
    const handlebatchDetail = async ()=>{
        const get = await TeacherBatchesAssignmentShow(params.id)
        if(get.status === "success"){
            setAssignemntDetail(get.message)
            setContent(get.message.contents)
            const dateObject = new Date(get.message.submission_date);

                // Format the date using toLocaleDateString and toLocaleTimeString
                const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
                const dateString = dateObject.toLocaleDateString('en-US', options);
                // const timeString = dateObject.toLocaleTimeString('en-US');
             setSubmissionDate(dateString);

             let html:any = [];
             let spit:any = get.message.media.split(',');
               if(spit.length > 0){
                 spit.map(async(item:any,index:number)=>{
                   let checkURL =  isUrl(item);
                   if(checkURL){
                     const lastPartAfterLastDot =  getLastpartFromString('.',item);
                     html.push({
                       link:item,
                       ext:lastPartAfterLastDot
                     })
                   }
                  })
               }
               setUploaded(html);
        }
      }
    useEffect(()=>{
        handlebatchDetail();
    },[])

    console.log(uploadedFiles)
  return (
   <>
    <BreadcrumbText name={`${assignemntDetail?.name}`} />
      
    <div className=' bg-white p-2 rounded-xl my-2'>
    <div className='p-2 rounded-lg min-h-[400px]'>
      
      <div>
        <div className='my-3'></div>
        <TinyMice height={300} type={true} value={content} onChange={handleContentChange} />
      </div>
      <div className='my-2'>
        <p className=' font-semibold flex gap-4'>Files  
        
        {
              uploadedFiles.length > 0 ? (
                uploadedFiles.map((item:any,index:number)=>(
                  item.ext === "exe" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-gray-500 text-white p-1 rounded-md"  >
                    <FaStop />
                    </a>
                    </div>
                  ) : 
                  item.ext === "mp4" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaVideo />
                    </a>
                   </div>
                  ) : item.ext === "mp3" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaAudible />
                    </a>
                    </div>
                  ):  item.ext === "pdf" ? (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaFilePdf />
                    </a>
                    </div>
                  ):  item.ext === "docx" ? (
                    <div key={index} className="flex gap-2 "> 
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaFileWord />
                    </a>
                    </div>
                  ): (
                    <div key={index} className="flex gap-2 ">
                    <a href={item.link} target="_blank" className="bg-blue-500 text-white p-1 rounded-md"  >
                    <FaStar />
                    </a>
                    </div>
                  )
                                    
                ))
              ):null
            }
        </p>
      </div>
        <div className='my-3'>
                <p className="font-semibold">Submission Date :  {submissionDate}</p>
        </div>
    </div>

    </div>
   
   </>
  )
}

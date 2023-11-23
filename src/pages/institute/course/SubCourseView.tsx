import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import { getInstituteCoursesById } from '../../../service/institute/course.service';
import { decryptUUID } from '../../../helper/encryptionKey';
import { useParams } from 'react-router-dom';
import DataGrids from '../../../components/table/DataGrids';

export default function SubCourseView() {
    const {id} = useParams();
    const [name,setName] = useState("");
    let decruptId:any  =decryptUUID(id);
    useEffect(()=>{
        const api = async () => {
            const getCourse = await getInstituteCoursesById(decryptUUID(id));
            if(getCourse) {
                setName(getCourse?.message?.name)
            } 
          }
        api();
    },[]);
  return (
    <div>
      <Breadcrumb name={`${name } Course`}>
      </Breadcrumb>
      <div className='my-3'>
        <DataGrids name="CourseSubCourseView" refresh={(Math.random()* (99999 - 1000) + 1000)} id={decruptId} />
      </div>

    </div>
  )
}

import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/table/DataTable'
import { getInstituteSubCoursesActive } from '../../../service/institute/sub-course.service';

export default function CourseLink() {
  const [subCoureList, setSubCourseList] = useState<any>([]);

  useEffect(() =>{
    const getApi =async () => {
        const get = await getInstituteSubCoursesActive();
        if(get){
          setSubCourseList(get.message)
        }
    }
    getApi();
  },[])



  const handleDataSubmit = (selectedData:any) => {
    // Here, you can send the selected data to the server using an API call or perform any desired action.
    console.log('Selected Data:', selectedData);
  };

  return (
    <>
    <div>CourseLink</div>
    <DataTable name="linkCourse"  data={subCoureList} onSubmit={handleDataSubmit} />
    </>
  )
}

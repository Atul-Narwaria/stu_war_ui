import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/table/DataTable'
import { getInstituteSubCoursesActive } from '../../../service/institute/sub-course.service';
import { getInstituteCoursesActive } from '../../../service/institute/course.service';
import { Autocomplete, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { InstituteCreateCourselink } from '../../../service/institute/courseLink.service';
import { useNavigate } from 'react-router-dom';

export default function CourseLink() {
  const [subCoureList, setSubCourseList] = useState<any>([]);
  const [courseList, setCourseList] = useState<any>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>();
  const [selectedSubCourse, setSelectedSubCourse] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() =>{
    const getApi =async () => {
        const get = await getInstituteSubCoursesActive();
        
        if(get){
          setSubCourseList(get.message)
        }
        const getCourse = await getInstituteCoursesActive();
        if(getCourse){
          setCourseList(getCourse.message)
        }
    }
    getApi();
  },[])




  const handleDataSubmit = (selectedData:any) => {
    console.log(selectedData)
    let ids:any = [];
    if(selectedData.length>0){
      selectedData.map((e:any)=>{
        ids.push(e.id);
      })
    }    
    setSelectedSubCourse(ids)
  };

const handleSubmit = ()=>{
  setIsLoading(true)
  if(selectedCourse === null || selectedCourse === undefined){
    toast.error("Course required", {
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
  if(selectedSubCourse.length === 0){
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
  const create = async()=>{
   const {code,message} =  await InstituteCreateCourselink(selectedCourse,selectedSubCourse)
   if(code === 200){
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
    navigate("/institute/course") 
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
   }
  }
  create();
  setIsLoading(false)
}

  return (
    <>
     <div className='bg-white p-2 rounded-md '>
     <div className='my-2'>
      <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={courseList}
                  getOptionLabel={(option: any) => option?.name}
                  sx={{ width: 1 }}
                  onChange={(event: any, newValue: any | null) => {
                    setSelectedCourse(newValue?.id);
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        label="select Course *"
                      />
                    </>
                  )}
                />
      </div>
          <DataTable name="linkCourse"  data={subCoureList} onSubmit={handleDataSubmit} />
          <div className="my-2">
            <button onClick={handleSubmit} className=' bg-primary px-3 py-2 w-full text-white rounded-lg  '>Link Course </button>
          </div>
     </div>
    </>
  )
}

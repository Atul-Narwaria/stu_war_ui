import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/table/DataTable'
import { getInstituteSubCoursesActive } from '../../../../service/institute/sub-course.service';
import { getInstituteCoursesActive } from '../../../../service/institute/course.service';
import { Autocomplete, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { InstituteCreateCourseStundet, InstituteCreateCourselink } from '../../../../service/institute/courseLink.service';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb';
import Course from './../Course';
import SelectPaginationDataGrid from '../../../../components/table/SelectPaginationDataGrid';

export default function AddStudentCourse() {
  const [subCoureList, setSubCourseList] = useState<any>([]);
  const [courseList, setCourseList] = useState<any>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>();
  const [selectedSubCourse, setSelectedSubCourse] = useState<any>([]);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStudentList, setSelectedStudentList] = useState<any>([]);
   
  const navigate = useNavigate();
  useEffect(() =>{
    const api = async()=>{
      if(selectedCourseCategory === 1){
        const getCourse = await getInstituteCoursesActive();
        if(getCourse){
          setCourseList(getCourse.message)
        }
      }
      if(selectedCourseCategory === 2){
        const get = await getInstituteSubCoursesActive();
        if(get){
          setCourseList(get.message)
        }
      }
    }
    api();
},[selectedCourseCategory])


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
  console.log("hit")
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
  let type:any = null;
  if(selectedCourseCategory === 1){
    type = 1;
  }
  if(selectedCourseCategory === 2){
    type = 2;
  }
  const { message, status } = await InstituteCreateCourseStundet(
    selectedCourse,
    selectedStudentList,
    type
  );
  if (status == "error") {
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
  } else {
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
    // navigate("/institute/course") 

    setIsLoading(false);
   
  }
  setIsLoading(false)
}
const CourseCategory = [  
  { label: 'course', value: 1 },
  { label: 'sub course', value: 2 },
];


  return (
    <>
    <Breadcrumb name="link Course to Students">
        
      </Breadcrumb>
     <div className='bg-white my-2 p-2 rounded-md '>
     <div className='my-2'>
     <Autocomplete
     sx={{ 
      marginBottom:2

      }}
      options={CourseCategory}
      onChange={(event: any, newValue: any | null) => {
        setSelectedCourseCategory(newValue?.value);
      }}
      renderInput={(params) => (
        <TextField {...params} label="select course Category" variant="outlined" />
      )}
    />
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
      <SelectPaginationDataGrid name="courseStudentAdd"   onSubmit={handleDataSubmit}  />
          <div className="my-2">
            <button onClick={handleSubmit}  className=' bg-primary px-3 py-2 w-full text-white rounded-lg  '>Link Course </button>
          </div>
     </div>
    </>
  )
}

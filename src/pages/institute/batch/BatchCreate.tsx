import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import { getInstituteSubCoursesActive } from '../../../service/institute/sub-course.service';
import { Autocomplete, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import { InstituteBatch } from '../../../service/institute/batch.service';
import { useNavigate } from 'react-router-dom';

interface CreateForm {
    course: string;
    name: string;
    start_time: string;
    end_time: number;
    weekdays: any;
  }

export default function BatchCreate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const [subCourseList, setSubCourseList] = useState<any>([]);
    const [weekdays, setWeekdays] = useState<any>([]);
    const [selectedSubCourse, setSelectedSubCourse] = useState<any>(null);
    const [startTime, setStartTime] = useState<any>("");
    const [endTime, setEndTime] = useState<any>("");

    const [selectedValues, setSelectedValues] = useState<any>([]);
    const options = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
    const navigate = useNavigate();
    useEffect(()=>{
        const fetch = async()=>{
            const get = await getInstituteSubCoursesActive(); 
            if(get){
                setSubCourseList(get.message);
            }
        }
        fetch();
    },[])

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
      } = useForm<CreateForm>();

      const onSubmit: SubmitHandler<CreateForm> = async (data: any) => {
        setIsLoading(true)
        if(selectedValues.length <= 0){
          toast.error("Weekdays required", {
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
        let weeksdays:any = "";
        selectedValues.map((item:any,index:number)=>{
          if(index === selectedValues.length-1){
              weeksdays += item
          }else if(index === 0){
            weeksdays = item+','
          }
          else if(selectedValues.length-1 !== index ){
            weeksdays += item+',';
          }else if(selectedValues.length-1 == index){
            weeksdays += item
          }
        })
        if(startTime === null || !startTime){
          toast.error("start time required", {
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
        if(endTime === null || !endTime){
          toast.error("end time required", {
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
        let newStartTime = startTime.split(':');
        if(newStartTime[1].toString().length === 1 ){
             newStartTime = `${newStartTime[0]}:0${newStartTime[1]}`;
        }else {
          newStartTime = startTime
        }
        let newEndTime = endTime.split(':');
        if(newEndTime[1].toString().length === 1 ){
             newEndTime = `${newEndTime[0]}:0${newEndTime[1]}`;
        }else {
          newEndTime = endTime
        }
      
    const { code ,message, status } = await InstituteBatch(
      selectedSubCourse,
      data.name,
      newStartTime,
      newEndTime,
      weeksdays
    );

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
      setIsLoading(false);
      navigate("/institute/batch")
      reset();
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
      const handleCheckboxChange = (value:any) => {
        const isSelected = selectedValues.includes(value);
     
        if (isSelected) {
          setSelectedValues( selectedValues.filter((item:any) => item !== value));
        } else {
          setSelectedValues([...selectedValues, value]);
        }
      };

  return (
    <>
     <Breadcrumb name="Batch Create">
      </Breadcrumb>
      <div className="my-3 bg-white p-2 md:p-4 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-2 mb-2">
        <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={subCourseList}
                  getOptionLabel={(option: any) =>
                    option?.name ? option?.name : "select Course *"
                  }
                  sx={{ width: 1, marginBottom: "10px" }}
                  onChange={(event: any, newValue: any | null) => {
                    setSelectedSubCourse(newValue?.id);
                    
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField
                        error={
                          selectedSubCourse == null
                            ? errors.course
                              ? true
                              : false
                            : false
                        }
                        {...params}
                        label="select course *"
                        {...register("course", {
                          required: "course  required",
                        })}
                        helperText={
                          selectedSubCourse ? null : errors.course?.message
                        }
                      />
                    </>
                  )}
                />
        </div>
        <div className="grid grid-cols-1 gap-2 mb-2">
        <TextField
                  error={errors.name ? true : false}
                  {...register("name", {
                    required: "name required",
                    minLength: {
                      value: 3,
                      message: "minimun 3 character required",
                    },
                  })}
                  id="outlined-basic"
                  type="text"
                  label="name"
                  sx={{
                    width: 1,
                  }}
                  variant="outlined"
                  helperText={errors.name?.message}
                />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker sx={{ width:1 }} 
            defaultValue={dayjs()}
             onChange={(newValue:any) => setStartTime(`${newValue?.hour()}:${newValue?.minute()}`)}
            label="start time" />
            </LocalizationProvider>
            </div>
            <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker sx={{ width:1 }}
            defaultValue={dayjs()}
               onChange={(newValue) => setEndTime(`${newValue?.hour()}:${newValue?.minute()}`)}
            label="End time" />
            </LocalizationProvider>
            </div>
            </div>
            <div className="grid grid-cols-1 gap-2 mb-2">
                <label >Select Days</label>
            <FormGroup sx={{ 
                display:'flex',
                flexDirection:'row',
                gap:1,
                marginTop:-2
             }}>
                  {options.map((option:any,index:number) => (
                  <FormControlLabel key={index} control={<Checkbox value={option}     onChange={() => handleCheckboxChange(option)}  />} label={option} />
                ))}
            {/* <FormControlLabel control={<Checkbox value="MONDAY"   onChange={handleCheckBox}  />} label="MONDAY" /> */}
            {/* <FormControlLabel control={<Checkbox value="TUESDAY"  onChange={handleCheckBox}  />} label="TUESDAY" />
            <FormControlLabel control={<Checkbox value="WEDNESDAY"  onChange={handleCheckBox}  />} label="WEDNESDAY" />
            <FormControlLabel control={<Checkbox value="THURSDAY"  onChange={handleCheckBox}  />} label="THURSDAY" />
            <FormControlLabel control={<Checkbox value="FRIDAY"  onChange={handleCheckBox}  />} label="FRIDAY" />
            <FormControlLabel control={<Checkbox value="SATURDAY"  onChange={handleCheckBox}  />} label="SATURDAY" />
            <FormControlLabel control={<Checkbox value="SUNDAY"  onChange={handleCheckBox}  />} label="SUNDAY" /> */}
            </FormGroup>
            <button  className='mt-5 bg-primary p-2 text-white rounded-lg '>{isLoading ? "Creating..." : "Create Batch" }</button>
            </div>
        </form>
      </div>
    </>
  )
}

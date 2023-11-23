import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import { getInstituteSubCoursesActive } from '../../../service/institute/sub-course.service';
import { Autocomplete, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import { InstituteBatch, editInstituteBatch, getInstituteBatchById } from '../../../service/institute/batch.service';
import { useNavigate, useParams } from 'react-router-dom';
import { decryptUUID } from '../../../helper/encryptionKey';

interface CreateForm {
    course?: string;
    name: string;
    start_time?: string;
    end_time?: number;
    weekdays?: any;
  }

export default function BatchEdit() {
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const [subCourseList, setSubCourseList] = useState<any>([]);
    const [weekdays, setWeekdays] = useState<any>([]);
    const [selectedSubCourse, setSelectedSubCourse] = useState<any>(null);
    const [startTime, setStartTime] = useState<any>("");
    const [endTime, setEndTime] = useState<any>("");
    const [batchData, setBatchData] = useState<any>([]);
    const [defaultCourse, setDefaultCourse] = useState<any>(null);
    const [selectedValues, setSelectedValues] = useState<any>([]);
    const [weekDaysList, setWeekDaysList] = useState<any>([
      {name:"MONDAY",isCheck:false},
      {name:"TUESDAY",isCheck:false},
      {name:"WEDNESDAY",isCheck:false},
      {name:"THURSDAY",isCheck:false},
      {name:"FRIDAY",isCheck:false},
      {name:"SATURDAY",isCheck:false},
      {name:"SUNDAY",isCheck:false},
    ]);
    
    const navigate = useNavigate();
    useEffect(()=>{
        const fetch = async()=>{
            const get = await getInstituteSubCoursesActive(); 
            if(get){
                setSubCourseList(get.message);
            }
            const getbatchData  = await getInstituteBatchById(decryptUUID(id));
            if(getbatchData){
              setBatchData(getbatchData);
              setStartTime(getbatchData?.message?.start_time)
              setEndTime(getbatchData?.message?.end_time)
              setDefaultCourse(get?.message?.find((option:any)=>option.id === getbatchData?.message.fk_sub_course_id))
              setWeekdays(getbatchData?.message?.weekdays.split(","))
              setSelectedSubCourse(getbatchData?.message.fk_sub_course_id)
              setSelectedValues(getbatchData?.message?.weekdays.split(","))
            }
          
        }
        fetch();
        
    },[])
  useEffect(() =>{
    weekDaysList.map((item:any)=>{
      weekdays?.map((it:any)=>{
        if(it == item.name){
          setWeekDaysList((prevList:any) =>
          prevList.map((day:any) =>
            day.name === it ? { ...day, isCheck: !day.isCheck } : day
          )
        );
        } 
      })
    })
  },[weekdays])
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
      } = useForm<CreateForm>(
        {
          values: {
            name:batchData?.message?.name,
          }
        }
      );

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
        console.log(newStartTime)
        let startHour:any = "";
        let startEnd:any = "";
        if(newStartTime[1].toString().length === 1){
          startHour = `0${newStartTime[1]}`
        }else{
          startHour = newStartTime[1]
        }
        if(newStartTime[0].toString().length === 1){
          startEnd = `0${newStartTime[0]}`
        }else{
          startEnd = newStartTime[0]
        }

        let newEndtTime = endTime.split(':');
        let EndHour:any = "";
        let EndEnd:any = "";
        if(newEndtTime[1].toString().length === 1){
          EndHour = `0${newEndtTime[1]}`
        }else{
          EndHour = newEndtTime[1]
        }
        if(newEndtTime[0].toString().length === 1){
          EndEnd = `0${newEndtTime[0]}`
        }else{
          EndEnd = newEndtTime[0]
        }


        
    const { code ,message, status } = await editInstituteBatch(
      batchData?.message?.id,
      selectedSubCourse,
      data.name,
      `${startEnd}:${startHour}`,
      `${EndEnd}:${EndHour}`,
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
                  value={defaultCourse}
                  options={subCourseList}
                  getOptionLabel={(options: any) =>
                    options.name 
                  }
                  sx={{ width: 1, marginBottom: "10px" }}
                  onChange={(event: any, newValue: any | null)=> {
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
          InputLabelProps={{
            shrink: true,
          }}
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
           value={dayjs(`2022-01-02T${startTime}`)}
             onChange={(newValue:any) => setStartTime(`${newValue?.hour()}:${newValue?.minute()}`)}
            label="start time" />
            </LocalizationProvider>
            </div>
            <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker sx={{ width:1 }}
          value={dayjs(`2022-01-02T${endTime}`)}
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
                  {weekDaysList.map((option:any,index:number) => (
                      <FormControlLabel key={index} control={<Checkbox value={option.name} checked={option.isCheck}     onChange={() =>{ handleCheckboxChange(option.name); 
                        setWeekDaysList((prevList:any) =>
                        prevList.map((day:any) =>
                          day.name === option.name ? { ...day, isCheck: !day.isCheck } : day
                        )
                      );
                      }}  />} label={option.name} />
                ))}
                
            {/* <FormControlLabel control={<Checkbox value="MONDAY"   onChange={handleCheckBox}  />} label="MONDAY" /> */}
            {/* <FormControlLabel control={<Checkbox value="TUESDAY"  onChange={handleCheckBox}  />} label="TUESDAY" />
            <FormControlLabel control={<Checkbox value="WEDNESDAY"  onChange={handleCheckBox}  />} label="WEDNESDAY" />
            <FormControlLabel control={<Checkbox value="THURSDAY"  onChange={handleCheckBox}  />} label="THURSDAY" />
            <FormControlLabel control={<Checkbox value="FRIDAY"  onChange={handleCheckBox}  />} label="FRIDAY" />
            <FormControlLabel control={<Checkbox value="SATURDAY"  onChange={handleCheckBox}  />} label="SATURDAY" />
            <FormControlLabel control={<Checkbox value="SUNDAY"  onChange={handleCheckBox}  />} label="SUNDAY" /> */}
            </FormGroup>
            <button  className='mt-5 bg-primary p-2 text-white rounded-lg '>{isLoading ? "Updating..." : "update Batch" }</button>
            </div>
        </form>
      </div>
    </>
  )
}

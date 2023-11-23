import { FaBook, FaBookmark, FaClock, FaStar, FaTasks, FaTimes, FaUser, FaUsers } from "react-icons/fa";
import BasicCardIcon from "../../components/cards/BasicCardIcon";
import { MdTask } from "react-icons/md";
import { useEffect, useState } from "react";
import { TeacherEvents, teacherTotalStudents, teacherTotalbatch, teacherbatch, teacherbatchStatus } from "../../service/teacher/teacherDashboard.service";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import IconCardSkeleton from "../../components/skeletons/IconCardSkeleton";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { encryptUUID } from "../../helper/encryptionKey";
import { studentEvents, studentTotalbatch, studentbatch, studentbatchStatus } from "../../service/student/studentDashboard.service";

export default function Home() {

  const [totalBatch, setTotalBatch] = useState<any>(null);
  const [todayBatch, setTodayBatch] = useState<any>(null);
  const [batchList, setBatchList] = useState<any>(null);
  const [events, setEvents] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(()=>{
    const apis = async()=>{
      let totalbatchs = await studentTotalbatch();
      if(totalbatchs.status === "success"){
        setTotalBatch(totalbatchs.message);
      }
      let todaybatches = await studentbatch()
      if(todaybatches.status === "success"){
        setTodayBatch(todaybatches.message);
       
      }
      let batchList = await studentbatchStatus();
      if(batchList.status === "success"){
        setBatchList(batchList.message);
      }
      let events = await studentEvents();
      if(events.status === "success"){
        setEvents(events.message);
      }
    }
    apis();
  },[])
  
  const handleLiveClass = async(id:any)=>{
    let meeting = batchList[id].liveClassData?.meeting_number
    let password = batchList[id].liveClassData?.password
    console.log(password)
      navigate(`/student/zoom_class/${encryptUUID(meeting)}/${encryptUUID(password)}`)
  }

  return (
    <>
      <section className={`   flex flex-col lg:flex-row md:mt-3 lg:mt-0 gap-7 justify-around`}>
          <div className="grid grid-cols-7 w-full gap-1">
            <div className="lg:col-span-5 col-span-7 md:col-span-4 ">
              <div className="cards p-2 grid grid-col-1 lg:grid-cols-3 gap-3">
                {
                  totalBatch === null ? 
                  (
                   <IconCardSkeleton />

                  ) : 
                  (
                    <div className="py-2 px-5 shadow-xl rounded-xl bg-white ">
                  <div className="flex justify-between align-middle gap-10 py-3    ">
                      <div >
                        <p className=" font-semibold text-md text-gray-500">Total Batch</p>
                        <p className=" font-bold text-xl text-gray-900">{
                          totalBatch.toString().length > 1 ? totalBatch : "0"+totalBatch
                        }</p>
                      </div>
                      <div className="mt-1">
                        <div className="bg-primary p-3 rounded-lg">
                        <MdTask className=" text-2xl text-gray-900" />
                        </div>
                      </div>
                     </div>
                </div>
                  )
                }
                {
                  todayBatch === null ?
                  (
                    <IconCardSkeleton />
                  ) : 
                  (
                    <div className="py-2 px-5 shadow-xl rounded-xl bg-white ">
                <div className="flex justify-between align-middle gap-10 py-3    ">
                      <div >
                        <p className=" font-semibold text-md text-gray-500">Today Batch</p>
                        <p className=" font-bold text-xl text-gray-900">
                        {
                          todayBatch.remaining.toString().length > 1 ? todayBatch.remaining  : "0"+todayBatch.remaining 
                        }
                        /
                        {
                           todayBatch.total.toString().length > 1 ? todayBatch.total  : "0"+todayBatch.total 
                        }
                        </p>
                      </div>
                      <div className="mt-1">
                        <div className="bg-primary p-3 rounded-lg">
                        <FaTasks className=" text-2xl text-gray-900" />
                        </div>
                      </div>
                     </div>
                </div>
                  )
                }
               
              </div>
              <div className="p-2  ">
               {
                batchList === null ?
                (
                  <Skeleton variant="rounded" width={210} height={60} />
                )
                :
                (
                  <div className="cards p-2 bg-white rounded-lg shadow-lg ">
                  <p className="text-xl text-gray-800 font-semibold pl-2">Today Batches </p>
                  <div className="mt-4 mb-2">
                    {
                    batchList.map((batch:any,index:any) =>(
                     <div key={index} className={`p-2 border border-l-[0.5rem] boder-gray-300 rounded-lg m-3  flex flex-row justify-between ${batch.timeStatus ? ` border-l-green-600` : `border-l-gray-200`}`}>
                      <div className=" ">
                      <p className="text-gray-900 text-xl font-semibold">{batch.name}</p>
                      <p className="text-gray-500 text-md font-semibold flex gap-1"> <FaBookmark className="mt-[6px]" /> {batch.course} </p>
                      <p className="text-gray-500 text-md font-semibold flex gap-1"> <FaClock className="mt-[6px]" /> {batch.start_time} - {batch.end_time}</p>
                      </div>
                     <div>
                      {
                        batch.timeStatus ? 
                        (
                          <button onClick={()=>handleLiveClass(index)}  className="mt-4 px-4 py-2 bg-dark-purple text-green-100 rounded-3xl hover:shadow-xl">Start Class</button>
                        )
                        :
                        (
                          <button onClick={()=>handleLiveClass(index)}  className="mt-4 px-4 py-2 bg-dark-purple text-green-100 rounded-3xl hover:shadow-xl">Start Class</button>
                        )
                      }
                     </div>
                     </div>
                    ))
                    }
                  </div>
                  </div>
                )
               }
              </div>
            </div>
            <div className=" lg:col-span-2 col-span-7 md:col-span-3 p-2">
               <div className=" bg-white p-2 shadow-lg rounded-lg ">
              <div className="p-2">
              <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DateCalendar sx={{ 
                  width:1
                 }} />
              </LocalizationProvider>
              </div>
              <hr />
              <div  >
                <p className="text-xl text-gray-800 font-semibold pl-2 my-2">Upcoming Events</p>
                <div className=" ">
                {
                  events === null ?
                  null:
                  (
                    events.map((item:any,index:any)=>(
                      <div key={index} className={`border border-l-4 flex flex-row justify-between   p-2 my-2 rounded-lg ${item.category === 'holiday' ? `border-l-red-500` : `border-l-primary`}`}>
                        <div>
                          <p className="text-gray-900 text-md font-semibold">
                              {
                                item.name
                              }
                          </p>  
                          <p className="text-gray-400 text-sm font-semibold">
                              {
                                item.category
                              }
                          </p>  
                        </div>
                        <div>
                          <p className="mt-2">
                          {
                             dayjs(item.date).format('DD-MMM-YYYY')
                          }
                            </p>

                        </div>
                    </div>
                    ))
                  )
                }
                </div>
              </div>
               </div>
            </div>
          </div>
      </section>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumb";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import TinyMice from "../../../../components/editor/TinyMice";
import Upload from "../../../../components/upload/Upload";
import { getInstituteCoursesActive } from "../../../../service/institute/course.service";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import { InstituteCreateSubCourse } from "../../../../service/institute/sub-course.service";
interface CourseCreateForm {
  name: string;
  amount: number;
  durantion: number;
  course:string;
}

export default function SubCourseCreate() {
  const [fileUrl , setFileUrl] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CourseCreateForm>();
  const [content, setContent] = useState<string>('course details ');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const onSubmit: SubmitHandler<CourseCreateForm> = async (data: any) => {
    if(fileUrl === undefined || fileUrl === null){
      toast.error("Select Course Image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }
    const { message, status } = await InstituteCreateSubCourse(
      data.name,
      data.amount,
      fileUrl,
      data.durantion,
      content,
     
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
      reset();
      navigate("/institute/course") 
  
      setIsLoading(false);
     
    }
  };
  const handleFileUrl =  (url:any)=>{
    setFileUrl(url)

  }


  return (
    <>
      <Breadcrumb name="Create Sub Student">
      </Breadcrumb>
      <div className=" bg-white mt-3 md:p-4 p-2    rounded-lg shadow-md   ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-1  grid-col-1 ">
            <div className="p-1 md:p-5 ">
              
              <div className="grid grid-cols-1 gap-1 mb-2">
                <TextField
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                  {...register("name", {
                    required: "name required",
                    minLength: {
                      value: 3,
                      message: "minimun 3 character required",
                    },
                  })}
                  id="outlined-basic"
                  label="Name *"
                  sx={{
                    width: 1,
                  }}
                  variant="outlined"
                />
              </div>
              <div className="grid grid-cols-1 gap-2 mb-2">
                <TextField
                  error={errors.amount ? true : false}
                  helperText={errors.amount?.message}
                  {...register("amount", {
                    required: "amount required",
                  })}
                  type="number"
                  id="outlined-basic"
                  label="Amount *"
                  sx={{
                    width: 1,
                  }}
                  variant="outlined"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mb-2 ">
                <div>
                  <TextField
                    error={errors.durantion ? true : false}
                    {...register("durantion", {
                      required: "duration required",
                    })}
                    type="number"
                    id="outlined-basic"
                    label="Duration *"
                    sx={{
                      width: 1,
                    }}
                    variant="outlined"
                    helperText={errors.durantion?.message}
                  />
                </div>
                <div>
               <Upload setUrl={handleFileUrl} url={fileUrl} />
                </div>
                    <div>
                    <TinyMice value={content} onChange={handleContentChange} />
                    </div>
                <button
                  className=" bg-primary text-white p-3 rounded-lg hover:shadow-xl"
                  type="submit"
                  disabled={isLoading?true:false}
                >
                  {
                    isLoading ? "creating..." : "Create Course"
                  }
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
     
    </>
  );
}

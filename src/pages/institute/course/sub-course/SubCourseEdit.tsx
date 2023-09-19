import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../../../components/Breadcrumb";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import TinyMice from "../../../../components/editor/TinyMice";
import Upload from "../../../../components/upload/Upload";
import { InstituteCreateCourse, editInstitueCourseStatus, getInstituteCoursesById } from "../../../../service/institute/course.service";
import { useNavigate, useParams } from "react-router-dom";
import { decryptUUID } from "../../../../helper/encryptionKey";
import { editInstitueSubCourseStatus, getInstituteSubCoursesById } from "../../../../service/institute/sub-course.service";
interface CourseEditForm {
  name: string;
  amount: number;
  durantion: number;
}

export default function SubCourseEdit() {
  const [fileUrl , setFileUrl] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName]  = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [durant, setDurant] = useState<number>(0);
  const [file, setFile] = useState<any>("");
  const navigate = useNavigate();
  useEffect(() => {
   

    const api = async () => {
        const getCourse = await getInstituteSubCoursesById(decryptUUID(id));
        if(getCourse) {
            setName(getCourse?.message?.name)
            setAmount(getCourse?.message?.amount)
            setDurant(getCourse?.message?.durantion)
            setFileUrl(getCourse?.message?.image)
            setContent(getCourse?.message?.description)
        } 
      }
    api();
  },[name])
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CourseEditForm>({
    values: {
      name: name,
      amount: amount,
      durantion: durant,
    
    }
  });
  const [content, setContent] = useState<string>('course details ');
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const onSubmit: SubmitHandler<CourseEditForm> = async (data: any) => {
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
    const { message, status } = await editInstitueSubCourseStatus(
      decryptUUID(id),
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
     navigate("/institute/course/sub-course") 
      setIsLoading(false);
     
    }
  };
  const handleFileUrl =  (url:any)=>{
    setFileUrl(url)

  }
  const {id} = useParams();


  return (
    <>
      <Breadcrumb name={` Edit Sub Course (${name})`}>
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
                  InputLabelProps={{
                    shrink: true,
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
                    isLoading ? "updating..." : "Update Course"
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

import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "../../service/admin/auth.service";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { instituteLogin, login } from "../../store/auth";
import { InstituteLogin } from "../../service/institute/institute.service";

interface IFormInput {
  email: string;
  password: string;
}

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [Logintype, setLogintype] = useState("student");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (Logintype == "Admin") {
      const { code, message, status, token, role } = await AdminLogin(
        data.email,
        data.password
      );
      if (code === 200) {
        if (status === "error") {
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
        Cookies.set(`role`, `${role}`);
        Cookies.set("token", `${token}`);
        dispatch(login());
        navigate("/admin", { replace: true });
      } else {
        toast.error("incorrect email/password", {
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
    if (Logintype == "Institute") {
      const { code, message, status, token, role } = await InstituteLogin(
        data.email,
        data.password
      );
      if (code === 200) {
        if (status === "error") {
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
        Cookies.set(`role`, `${role}`);
        Cookies.set("token", `${token}`);
        dispatch(instituteLogin());
        navigate("/institute", { replace: true });
      } else {
        toast.error("incorrect email/password", {
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
    } else {
      toast.error("select login type", {
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
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen content-center px-10 lg:px-2   w-full    ">
      <div
        className=" hidden lg:block h-screen relative"
        style={{
          background: `url('https://www.einfosoft.com/templates/admin/smartangular/source/light/assets/images/pages/bg-01.png')  center `,
        }}
      ></div>
      <div className="mx-[1rem] lg:mx-[8rem]   ">
        <h3 className=" text-[2rem] font-semibold mt-[2vh] ">
          Welcome to Smart
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-around align-middle mt-[5vh]">
          <button
            onClick={(e: any) => {
              setLogintype(e.target.innerHTML);
            }}
            className=" bg-blue-500 px-4 py-2 rounded-lg hover:shadow-lg text-white font-semibold"
          >
            Institute
          </button>
          <button
            onClick={(e: any) => {
              setLogintype(e.target.innerHTML);
            }}
            className=" bg-blue-700 px-4 py-2 rounded-lg hover:shadow-lg text-white font-semibold"
          >
            Teacher
          </button>
          <button
            onClick={(e: any) => {
              setLogintype(e.target.innerHTML);
            }}
            className=" bg-blue-900 px-4 py-2 rounded-lg hover:shadow-lg text-white font-semibold"
          >
            Student
          </button>
          <button
            onClick={(e: any) => {
              setLogintype(e.target.innerHTML);
            }}
            className=" bg-cyan-900 px-4 py-2 rounded-lg hover:shadow-lg text-white font-semibold"
          >
            Admin
          </button>
        </div>
        <h3 className="text-[2rem] font-semibold mt-[3vh]">
          Sign in as : <span className=" underline">{Logintype}</span>
        </h3>

        <div className="mt-[3vh]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              variant="outlined"
              sx={{ width: "100%", marginBottom: "30px" }}
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={errors.email ? true : false}
              >
                email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={"text"}
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
                endAdornment={
                  <InputAdornment position="end">
                    <MdEmail color={errors.email ? "red" : ""} />
                  </InputAdornment>
                }
                label="email"
                error={errors.email ? true : false}
              />
              {errors.email?.type === "required" && (
                <p role="alert" className="input-error">
                  email is required
                </p>
              )}
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{ width: "100%", marginBottom: "10px" }}
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={errors.password ? true : false}
              >
                password
              </InputLabel>
              <OutlinedInput
                error={errors.password ? true : false}
                id="outlined-adornment-password"
                {...register("password", { required: true, maxLength: 20 })}
                endAdornment={
                  <InputAdornment position="end">
                    <button
                      // aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      // edge="end"
                    >
                      {showPassword ? (
                        <FaEye color={errors.password ? "red" : ""} />
                      ) : (
                        <FaEyeSlash color={errors.password ? "red" : ""} />
                      )}
                    </button>
                  </InputAdornment>
                }
                label="Password"
                type={showPassword ? "text" : "password"}
              />
              {errors.password?.type === "required" && (
                <p role="alert" className="input-error">
                  password is required
                </p>
              )}
            </FormControl>
            <div className="flex flex-row justify-between mb-10">
              <div className="flex flex-row gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 mt-1 cursor-pointer"
                />
                <span>Remember me?</span>
              </div>
              <div>
                <p className=" text-red-600 cursor-pointer">forgot password?</p>
              </div>
            </div>
            <button
              onClick={() => handleSubmit(onSubmit)}
              className=" bg-blue-700 text-white text-md w-full p-3 hover:bg-blue-800 hover:shadow-xl duration-500 rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

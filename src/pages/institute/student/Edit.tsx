import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decryptUUID } from "../../../helper/encryptionKey";
import { SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";
import Breadcrumb from "../../../components/Breadcrumb";
import { toast } from "react-toastify";
import { editInstitueStundetStatus, getInstituteStudentsById } from "../../../service/institute/student.service";
import { getCityByStateCountry, getCitybyId } from "../../../service/admin/location/city.service";
import { getActiveStatesByCountry, getStatesbyId } from "../../../service/admin/location/state.service";
import { getActiveCountry } from "../../../service/admin/location/country.service";
import { Autocomplete, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


interface StudentUpdateForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  dob: string;
  gender?: string;
  county?: string;
  state?: string;
  city?: string;
  address: string;
  pin: string;
}

export default function Edit() {
  const [userId, setuserId] = useState<any>("");
  const {id} = useParams();
  const [countryList, setCountrylist] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState([]);
  const [statelist, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState<any>("");
  const [citylist, setCityList] = useState([]);
  const [selectCity, setSelectedCity] = useState<any>("");
  const [selectCountry, setSelectedCounty] = useState<any>("");
  const [gender, setGender] = useState<any>("");
  const [dob, setDob] = useState<any>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>([]);
  const [defaultState, setDefaultState] = useState<any>(null);
  const [defaultCity, setDefaultCity] = useState<any>(null);
const [name, setName] = useState<any>("");
const [lastname, setLastName] = useState<any>("");
const [phone, setPhone] = useState<any>("");
const [email, setEmail] = useState<any>("");
const [address, setAddress] = useState<any>("");
const [pin, setPin] = useState<any>("");


const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<StudentUpdateForm>({
    values: {
      firstname: name,
      lastname: lastname,
      email: email,
      phone: phone,
      dob: dob,
      address: address,
      pin: pin,
    }
  });


  
  useEffect(() => {
   

    const api = async () => {
      const key = decryptUUID(id)
      setuserId(key);
        const getUser = await getInstituteStudentsById(decryptUUID(id));
        if(getUser) {
          setUserData(getUser);
          setName(getUser.message?.firstName)
          setLastName(getUser.message?.lastName)
          setEmail(getUser.message?.email)
          setPhone(getUser.message?.phone)
          setDob(getUser.message?.dob)
          setAddress(getUser.message?.studentAddress[0]?.Address)
          setPin(getUser.message?.studentAddress[0]?.pin)
          setGender(getUser.message?.gender)
        } 
        
        const get1 = await getActiveStatesByCountry(getUser.message?.studentAddress[0]?.fkcountryId);
        console.log(get1);
        if(get1.status === "success"){
          let dfState = get1.message 
          if(dfState){
            setDefaultState(dfState?.find((option: any) => option?.id === getUser.message?.studentAddress[0]?.fkstateId ))
            handleCityByState(getUser.message?.studentAddress[0]?.fkcountryId,getUser.message?.studentAddress[0]?.fkstateId)
            setSelectedState( getUser.message?.studentAddress[0]?.fkstateId)
          }
        }
        
       
        const get2 = await getCityByStateCountry(getUser.message?.studentAddress[0]?.fkcountryId, getUser.message?.studentAddress[0]?.fkstateId);
       if(get2.status === "success"){
        let dfCity = get2.message;
        if(dfCity){
          setDefaultCity(dfCity?.find((option: any) => option?.id === getUser.message?.studentAddress[0]?.fkcityId ))
          setSelectedCity(getUser.message?.studentAddress[0]?.fkcityId)
        }
       }
      const get = await getActiveCountry();
      if (get?.status == "success") {
        let data = get?.message;
        setDefaultCountry(
          data?.find((option: any) => option?.CounrtyName === "India")
        );
        setSelectedCounty(
          data?.find((option: any) => option?.CounrtyName === "India")
        );
        let county = data?.find(
          (option: any) => option?.CounrtyName === "India"
        );
        setSelectedCounty(county?.id);
        handleStateByCountry(county?.id);
        setCountrylist(data);

        
      }
    };

    api();
  },[])

  const handleStateByCountry = async (value: string) => {
    const get = await getActiveStatesByCountry(value);
    setSelectedCounty(value);
    setStateList(get.message);
  };
  const handleCityByState = async (countyId: string, StateId: string) => {
    setSelectedState(StateId);
    const get = await getCityByStateCountry(countyId, StateId);
    setCityList(get.message);
  };
  const onSubmit: SubmitHandler<StudentUpdateForm> = async (data: any) => {
    setIsLoading(true)
    const { message, status } = await editInstitueStundetStatus(
      userId,
      data.firstname,
      data.lastname,
      data.email,
      data.phone,
      dob,
      gender,
      selectCountry,
      selectedState,
      selectCity,
      data.address,
      data.pin
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
      setIsLoading(false);
      reset();
      navigate("/institute/student")
    }
  };
  console.log(selectCity);
  return (
    <>
     <Breadcrumb name="Edit Student"></Breadcrumb>
     <div className=" bg-white mt-3 md:p-4 p-2    rounded-lg shadow-md   ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2  grid-col-1 ">
            <div className="p-1 md:p-5 md:border-r-2 ">
              <p className="mb-3 text-gray-500">Basic Info</p>
              <div className="grid grid-cols-1 gap-2 mb-2">
                <TextField
                
            
                error={errors.firstname ? true : false}
                  helperText={errors.firstname?.message}
                  {...register("firstname", {
                    required: "firstname required",
                    minLength: {
                      value: 3,
                      message: "minimun 3 character required",
                    },
                    
                  })}
                  id="outlined-basic"
                  label="First Name *"
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                 
                  error={errors.lastname ? true : false}
                  helperText={errors.lastname?.message}
                  {...register("lastname", {
                    required: "lastname required",
                    minLength: {
                      value: 3,
                      message: "minimun 3 character required",
                    },
                  })}
                  id="outlined-basic"
                  label="Last Name *"
                  sx={{
                    width: 1,
                  }}
                  variant="outlined"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mb-2 ">
                <div>
                  <TextField
                   InputLabelProps={{
                    shrink: true,
                  }}
                    error={errors.phone ? true : false}
                    {...register("phone", {
                      required: "phone required",
                      minLength: {
                        value: 10,
                        message: "minimun 10 character required",
                      },
                      maxLength: {
                        value: 10,
                        message: "maximum 10 character required",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "only number required",
                      },
                    })}
                    id="outlined-basic"
                    type="tel"
                    label="phone *"
                    sx={{
                      width: 1,
                    }}
                    variant="outlined"
                    helperText={errors.phone?.message}
                  />
                </div>
                <TextField
                   InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.email ? true : false}
                  {...register("email", {
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "invalid email format",
                    },
                  })}
                  id="outlined-basic"
                  type="email"
                  label="email"
                  sx={{
                    width: 1,
                  }}
                  variant="outlined"
                  helperText={errors.email?.message}
                />
              </div>
              <div className="grid grid-cols-1 gap-2 mb-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth *"
                   value={dayjs(userData.message?.dob)}
                    disableFuture
                    onChange={(date: any) => {
                      
                      setDob(
                        `${date?.year()}-${date?.month()}-${date?.date()}`
                      );
                    }}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        error: dob == null ? true : false,
                        helperText: dob == null ? "dob required" : null,
                      },
                    }}
                  />
                </LocalizationProvider>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <p
                    className={`text-sm ${
                      gender == null ? "#e74c3c" : "text-gray-500"
                    } `}
                  >
                    Select Gender *
                  </p>
                </FormLabel>
                <RadioGroup
                  row
                  sx={{
                    color: gender == null ? "#e74c3c" : "",
                    marginTop: "-10px",
                  }}
                  value={gender}
                  onChange={(event:any) => {
                    setGender(event.target.value);
                  }}
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        sx={{
                          color: gender == null ? "#e74c3c" : "",
                        }}
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        sx={{
                          color: gender == null ? "#e74c3c" : "",
                        }}
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={
                      <Radio
                        sx={{
                          color: gender == null ? "#e74c3c" : "",
                        }}
                      />
                    }
                    label="Other"
                  />
                </RadioGroup>
                <small className="pl-2 mt-[-10px] text-red-600">
                  {gender == null ? "gender required" : null}
                </small>
              </div>
            </div>
            <div className="p-1 md:p-5  ">
              <p className="mb-3 text-gray-500">Address </p>
              <div className="grid grid-cols-1 gap-2 mb-2">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                 value={defaultState}
                  options={statelist}
                  getOptionLabel={(option: any) =>
                    option?.stateName ? option.stateName : "select state *"
                  }
                  sx={{ width: 1, marginBottom: "10px" }}
                  onChange={(event: any, newValue: any | null) => {
                    setSelectedState(newValue?.id);
                    handleCityByState(selectCountry, newValue?.id);
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField
                        error={
                          selectedState == null
                            ? errors.state
                              ? true
                              : false
                            : false
                        }
                        {...params}
                        label="select state *"
                        {...register("state", {
                          required: "state  required",
                        })}
                        helperText={
                          selectedState ? null : errors.state?.message
                        }
                      />
                    </>
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={citylist}
                  value={defaultCity}
                  getOptionLabel={(option: any) => option?.cityName}
                  sx={{ width: 1 }}
                  onChange={(event: any, newValue: any | null) => {
                    setSelectedCity(newValue?.id);
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField
                        error={
                          selectCity == null
                            ? errors.city
                              ? true
                              : false
                            : false
                        }
                        {...params}
                        label="select city *"
                        {...register("city", {
                          required: "city  required",
                        })}
                        helperText={selectCity ? null : errors.city?.message}
                      />
                    </>
                  )}
                />
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline={true}
                  rows={3}
                  error={errors.address ? true : false}
                  {...register("address", {
                    required: "address required",
                  })}
                  id="outlined-basic"
                  label="address *"
                  sx={{
                    width: 1,
                    marginBottom: 1,
                  }}
                  variant="outlined"
                  helperText={errors.address?.message}
                />

                <TextField
                   InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.pin ? true : false}
                  {...register("pin", {
                    required: "pin required",
                    minLength: 6,
                    maxLength: 6,
                  })}
                  id="outlined-basic"
                  type="number"
                  label="pin *"
                  sx={{
                    width: 1,
                  }}
                  variant="outlined"
                  helperText={errors.pin?.message}
                />

                <button
                  className=" bg-primary text-white p-3 rounded-lg hover:shadow-xl"
                  type="submit"
                  disabled={isLoading?true:false}
                >
                  {
                    isLoading ? "updating..." : "update Student"
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

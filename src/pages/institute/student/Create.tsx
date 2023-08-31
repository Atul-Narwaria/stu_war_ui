import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import StepperBasic from "../../../components/stepper/StepperBasic";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { getActiveCountry } from "../../../service/admin/location/country.service";
import { getActiveStatesByCountry } from "../../../service/admin/location/state.service";
import { getCityByStateCountry } from "../../../service/admin/location/city.service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Autocomplete } from "@mui/material";

interface StudentCreateForm {
  name: string;
  email: string;
  phone: number;
  dob: string;
  county: string;
  state: string;
  city: string;
  address: string;
  pin: string;
}

export default function Create() {
  const [countryList, setCountrylist] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState([]);
  const [statelist, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [citylist, setCityList] = useState([]);
  const [selectCity, setSelectedCity] = useState<any>(null);
  const [selectCountry, setSelectedCounty] = useState<any>("");

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<StudentCreateForm>();

  useEffect(() => {
    const api = async () => {
      const get = await getActiveCountry();
      if (get?.status == "success") {
        let data = get?.message;
        console.log(data);
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
  }, []);
  const handleStateByCountry = async (value: string) => {
    const get = await getActiveStatesByCountry(value);
    setSelectedCounty(value);
    setStateList(get.message);
  };
  const handleCityByState = async (countyId: string, StateId: string) => {
    setSelectedState(StateId);
    const get = await getCityByStateCountry(countyId, StateId);
    console.log(get.message);
    setCityList(get.message);
  };
  const onSubmit: SubmitHandler<StudentCreateForm> = async (data: any) => {
    console.log(data);
    // const { message, status } = await createInstiture(
    //   data.name,
    //   data.email,
    //   data.phone,
    //   data.password,
    //   data.confirmPassword,
    //   selectCountry,
    //   selectedState,
    //   selectCity,
    //   data.address,
    //   data.pin
    // );
    // if (status == "error") {
    //   toast.error(message, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // } else {
    //   toast.success(message, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });

    //   reset();
  };

  return (
    <>
      <Breadcrumb name="Create Student"></Breadcrumb>
      <div className=" bg-white mt-3 md:p-4 p-2    rounded-lg shadow-md   ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2  grid-col-1 ">
            <div className="p-1 md:p-5 md:border-r-2 ">
              <p className="mb-3 text-gray-500">Basic Info</p>
              <div className="grid grid-cols-1 gap-2 mb-2">
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
                  label="Full Name *"
                  sx={{
                    width: 1,
                  }}
                  variant="outlined"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mb-2 ">
                <div>
                  <TextField
                    error={errors.phone ? true : false}
                    {...register("phone", {
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
                    label="Date of Birth"
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        error: true,
                        helperText: "error",
                      },
                    }}
                  />
                </LocalizationProvider>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className="p-1 md:p-5  ">
              <p className="mb-3 text-gray-500">Address</p>
              <div className="grid grid-cols-1 gap-2 mb-2">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={statelist}
                  getOptionLabel={(option: any) =>
                    option?.stateName ? option?.stateName : "select state"
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
                        label="select state"
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
                        label="select city"
                        {...register("city", {
                          required: "city  required",
                        })}
                        helperText={selectCity ? null : errors.city?.message}
                      />
                    </>
                  )}
                />
                <TextField
                  multiline={true}
                  rows={3}
                  error={errors.address ? true : false}
                  {...register("address", {
                    required: "address required",
                  })}
                  id="outlined-basic"
                  label="address"
                  sx={{
                    width: 1,
                    marginBottom: 1,
                  }}
                  variant="outlined"
                  helperText={errors.address?.message}
                />

                <TextField
                  error={errors.pin ? true : false}
                  {...register("pin", {
                    required: "pin required",
                    minLength: 6,
                    maxLength: 6,
                  })}
                  id="outlined-basic"
                  label="pin"
                  sx={{
                    width: 1,
                  }}
                  variant="outlined"
                  helperText={errors.pin?.message}
                />

                <button
                  className=" bg-primary text-white p-3 rounded-lg hover:shadow-xl"
                  type="submit"
                >
                  Create Student
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

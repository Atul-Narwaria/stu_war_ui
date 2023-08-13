import React, { useEffect, useState } from "react";
import DataGrids from "../../../components/table/DataGrids";
import Basicmodel from "../../../components/modals/Basicmodel";
import Breadcrumb from "../../../components/Breadcrumb";
import TextField from "@mui/material/TextField";
import { getActiveCountry } from "../../../service/admin/location/country.service";
import Autocomplete from "@mui/material/Autocomplete";
import DataGridSkeleton from "../../../components/skeletons/DataGridSkeleton";
import { useForm, SubmitHandler } from "react-hook-form";
import { getActiveStatesByCountry } from "../../../service/admin/location/state.service";
import { getCityByStateCountry } from "../../../service/admin/location/city.service";
import { createInstiture } from "../../../service/admin/institute/institue.service";
import { toast } from "react-toastify";

interface instituteForm {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  county: string;
  state: string;
  city: string;
  address: string;
  pin: string;
}

export default function Institute() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryList, setCountrylist] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState([]);
  const [statelist, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [citylist, setCityList] = useState([]);
  const [selectCity, setSelectedCity] = useState<any>(null);
  const [selectCountry, setSelectedCounty] = useState<any>("");
  const [render, setRender] = useState(1);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<instituteForm>();

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
  const onSubmit: SubmitHandler<instituteForm> = async (data: any) => {
    const { message, status } = await createInstiture(
      data.name,
      data.email,
      data.phone,
      data.password,
      data.confirmPassword,
      selectCountry,
      selectedState,
      selectCity,
      data.address,
      data.pin
    );
    console.log(status);
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
      setIsModalOpen(false);
      setRender(render + 1);
    }
  };
  return (
    <>
      <Breadcrumb name="Institue">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="bg-primary text-white px-10 py-2 rounded-lg shadow-lg"
        >
          Add
        </button>
      </Breadcrumb>
      <div className="mt-3">
        {/* <DataGridSkeleton /> */}
        <DataGrids name="institutemaster" height="70vh" refresh={render} />
      </div>

      {isModalOpen ? (
        <div className="">
          <Basicmodel
            isOpen={isModalOpen}
            isClode={setIsModalOpen}
            width="w-[70vw]"
            name="Create  Institute"
          >
            <form
              className=" flex flex-col p-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                error={errors.name ? true : false}
                {...register("name", {
                  required: "name required",
                  minLength: {
                    value: 3,
                    message: "minimun 3 character required",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter a valid name (letters only)",
                  },
                })}
                id="outlined-basic"
                label="name"
                sx={{
                  width: 1,
                }}
                variant="outlined"
              />
              {errors.name ? (
                <p role="alert" className="input-error text-red-700">
                  {errors.name?.message}
                </p>
              ) : null}
              <div className="grid grid-rows-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <TextField
                    error={errors.email ? true : false}
                    {...register("email", {
                      required: "email required",
                      minLength: {
                        value: 3,
                        message: "minimun 3 character required",
                      },
                    })}
                    id="outlined-basic"
                    label="eamil"
                    sx={{
                      width: 1,
                    }}
                    type="email"
                    variant="outlined"
                  />
                  {errors.email ? (
                    <p role="alert" className="input-error text-red-700">
                      {errors.email?.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <TextField
                    error={errors.phone ? true : false}
                    {...register("phone", {
                      required: "phone required",
                      minLength: {
                        value: 10,
                        message: "phone should be 10 digit",
                      },
                      maxLength: {
                        value: 10,
                        message: "phone should be 10 digit",
                      },
                      pattern: {
                        value: /^[0-9]/,
                        message:
                          "Please enter a valid phone number (number only)",
                      },
                    })}
                    id="outlined-basic"
                    label="phone"
                    sx={{
                      width: 1,
                    }}
                    variant="outlined"
                  />
                  {errors.phone ? (
                    <p role="alert" className="input-error text-red-700">
                      {errors.phone?.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-rows-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <TextField
                    error={errors.password ? true : false}
                    {...register("password", {
                      required: "password required",
                      minLength: {
                        value: 8,
                        message: "minimun 8 character required",
                      },
                    })}
                    id="outlined-basic"
                    label="password"
                    sx={{
                      width: 1,
                    }}
                    variant="outlined"
                  />
                  {errors.password ? (
                    <p role="alert" className="input-error text-red-700">
                      {errors.password?.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <TextField
                    error={errors.confirmPassword ? true : false}
                    {...register("confirmPassword", {
                      required: "confirmPassword required",
                    })}
                    id="outlined-basic"
                    label="confirmPassword"
                    sx={{
                      width: 1,
                    }}
                    variant="outlined"
                  />
                  {errors.confirmPassword ? (
                    <p role="alert" className="input-error text-red-700">
                      {errors.confirmPassword?.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-row gap-3 my-2 w-full">
                <Autocomplete
                  disablePortal
                  defaultValue={defaultCountry}
                  id="combo-box-demo"
                  options={countryList}
                  getOptionLabel={(option: any) => option?.CounrtyName}
                  sx={{ width: 1 }}
                  onChange={(event: any, newValue: any | null) => {
                    handleStateByCountry(newValue?.id);
                  }}
                  // onChange={(event, value) => {
                  //   handleStateByCountry(value?.id);
                  // }}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                />
              </div>
              <div className="grid grid-rows-1 md:grid-cols-2 gap-3">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={statelist}
                  getOptionLabel={(option: any) => option?.stateName}
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
                      />
                      {selectedState == null ? (
                        errors.state ? (
                          <p role="alert" className="input-error text-red-700">
                            {errors.state?.message}
                          </p>
                        ) : null
                      ) : null}
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
                      />
                      {selectCity == null ? (
                        errors.city ? (
                          <p role="alert" className="input-error text-red-700">
                            {errors.city?.message}
                          </p>
                        ) : null
                      ) : null}
                    </>
                  )}
                />
              </div>
              <div className="grid grid-rows-1 md:grid-cols-4 gap-3 my-3 ">
                <div className=" col-span-3">
                  <TextField
                    error={errors.address ? true : false}
                    {...register("address", {
                      required: "address required",
                    })}
                    id="outlined-basic"
                    label="address"
                    sx={{
                      width: 1,
                    }}
                    variant="outlined"
                  />
                  {errors.address ? (
                    <p role="alert" className="input-error text-red-700">
                      {errors.address?.message}
                    </p>
                  ) : null}
                </div>
                <div>
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
                  />
                  {errors.pin ? (
                    <p role="alert" className="input-error text-red-700">
                      {errors.pin?.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                // onClick={() => handleSubmit(onSubmit)}
                className=" bg-secondary text-white text-xl w-full p-3 hover:bg-primary hover:shadow-xl 
          duration-500 rounded-lg"
              >
                Create
              </button>
            </form>
          </Basicmodel>
        </div>
      ) : null}
    </>
  );
}

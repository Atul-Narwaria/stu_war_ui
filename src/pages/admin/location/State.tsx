import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Breadcrumb from "../../../components/Breadcrumb";
import Basicmodel from "../../../components/modals/Basicmodel";
import TextField from "@mui/material/TextField";
import {
  createCountry,
  getActiveCountry,
} from "../../../service/admin/location/country.service";
import DataGrids from "../../../components/table/DataGrids";
import Autocomplete from "@mui/material/Autocomplete";
import { createState } from "../../../service/admin/location/state.service";

interface stateForm {
  country: string;
  state: string;
}

export default function State() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryList, setCountrylist] = useState([]);
  const [selectCountry, setSelectCountry] = useState<any>(null);
  const [render, setRender] = useState(1);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<stateForm>();
  const onSubmit: SubmitHandler<stateForm> = async (data: any) => {
    reset();
    const { message, status } = await createState(selectCountry, data.state);
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
      setIsModalOpen(false);
      setRender(render + 1);
    }
  };
  useEffect(() => {
    const api = async () => {
      const get = await getActiveCountry();
      let data = get.message;
      setCountrylist(data);
    };

    api();
  }, []);

  // const handleSeletedCountry = async (value: any) => {
  //   console.log(value?.id);
  //   let id = value?.id;
  //   const getState = await getActiveStates(id);
  //   console.log(getState.message);
  // };
  return (
    <>
      <Breadcrumb backButton={true} name="State">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="bg-primary text-white px-5 py-2 rounded-lg shadow-lg"
        >
          State
        </button>
      </Breadcrumb>
      <div className="mt-3">
        <DataGrids name="AdminActiveState" refresh={render} />
      </div>

      <Basicmodel
        isOpen={isModalOpen}
        isClode={setIsModalOpen}
        name="Add Country"
      >
        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col p-2">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countryList}
            getOptionLabel={(option: any) => option.CounrtyName}
            sx={{ width: 1, marginBottom: "10px" }}
            onChange={(event: any, newValue: any | null) => {
              setSelectCountry(newValue?.id);
            }}
            renderInput={(params) => (
              <>
                <TextField
                  error={
                    selectCountry == null
                      ? errors.country
                        ? true
                        : false
                      : false
                  }
                  {...params}
                  label="select country"
                  {...register("country", {
                    required: "country  required",
                  })}
                />
                {selectCountry == null ? (
                  errors.country ? (
                    <p role="alert" className="input-error text-red-700">
                      {errors.country?.message}
                    </p>
                  ) : null
                ) : null}
              </>
            )}
          />

          <TextField
            error={errors.country ? true : false}
            {...register("state", {
              required: "state name required",
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
            label="state name"
            sx={{
              width: 1,
            }}
            variant="outlined"
          />
          {errors.state ? (
            <p role="alert" className="input-error text-red-700">
              {errors.state?.message}
            </p>
          ) : null}
          <div className="flex flex-row gap-3 my-2 justify-end">
            <button
              type="submit"
              // onClick={() => handleSubmit(onSubmit)}
              className=" bg-secondary text-white text-xl w-full p-3 hover:bg-primary hover:shadow-xl 
          duration-500 rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </Basicmodel>
    </>
  );
}

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Breadcrumb from "../../../components/Breadcrumb";
import Basicmodel from "../../../components/modals/Basicmodel";
import TextField from "@mui/material/TextField";
import { createCountry } from "../../../service/admin/location/country.service";
import DataGrids from "../../../components/table/DataGrids";

interface countryForm {
  country: string;
}

export default function Country() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [render, setRender] = useState(1);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<countryForm>();
  const onSubmit: SubmitHandler<countryForm> = async (data) => {
    reset();
    const { message, status } = await createCountry(data.country);
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
  return (
    <>
      <Breadcrumb backButton={true} name="Country">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="bg-primary text-white px-5 py-2 rounded-lg shadow-lg"
        >
          Country
        </button>
      </Breadcrumb>
      <div className="mt-3">
        <DataGrids name="AdminActiveCountry" refresh={render} />
      </div>

      <Basicmodel
        isOpen={isModalOpen}
        isClode={setIsModalOpen}
        name="Add Country"
      >
        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col p-2">
          <TextField
            error={errors.country ? true : false}
            {...register("country", {
              required: "country name required",
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
            label="country name"
            sx={{
              width: 1,
            }}
            variant="outlined"
          />
          {errors.country ? (
            <p role="alert" className="input-error text-red-700">
              {errors.country?.message}
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

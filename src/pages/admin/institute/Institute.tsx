import React, { useEffect, useState } from "react";
import DataGrids from "../../../components/table/DataGrids";
import Basicmodel from "../../../components/modals/Basicmodel";
import Breadcrumb from "../../../components/Breadcrumb";
import TextField from "@mui/material/TextField";
import { getActiveCountry } from "../../../service/admin/location/country.service";
import Autocomplete from "@mui/material/Autocomplete";
import DataGridSkeleton from "../../../components/skeletons/DataGridSkeleton";

export default function Institute() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryList, setCountrylist] = useState([]);
  const [statelist, setStatelist] = useState([]);

  useEffect(() => {
    const api = async () => {
      const get = await getActiveCountry();
      let data = get.message;
      setCountrylist(data);
    };

    api();
  }, []);
  const handleSeletedCountry = async (value: any) => {
    console.log(value?.id);
    let id = value?.id;
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
        <DataGridSkeleton />
        {/* <DataGrids name="institue" data={[]} /> */}
      </div>

      {isModalOpen ? (
        <div className="">
          <Basicmodel
            isOpen={isModalOpen}
            isClode={setIsModalOpen}
            width="w-[70vw]"
            name="Create  Institute"
          >
            <form className=" flex flex-col p-2">
              <TextField
                id="outlined-basic"
                label="Name"
                sx={{
                  width: 1,
                }}
                variant="outlined"
              />
              <div className="flex flex-row gap-3 my-2">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={countryList}
                  getOptionLabel={(option: any) => option.CounrtyName}
                  sx={{ width: 300 }}
                  onChange={(event, value) => handleSeletedCountry(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                />
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={countryData}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                /> */}
              </div>
              <div className="flex flex-row gap-3 my-2"></div>
            </form>
          </Basicmodel>
        </div>
      ) : null}
    </>
  );
}

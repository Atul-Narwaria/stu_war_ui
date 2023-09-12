import React, { useEffect, useState } from 'react';
import * as XLSX from "xlsx";// Import the xlsx library
import { createInstituteBulkStudent } from '../service/institute/student.service';
import { createInstituteBulkTeacher } from '../service/institute/teacher.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default  function ExcelImportService(props:{name:any}) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const handleFileUpload = (e:any) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
    const sendChunkToServer = async (chunk:any) => {
        try {
          // Send the data chunk to the server
          if(props.name === "InstitutebulkStudent"){
            await createInstituteBulkStudent(chunk);
          }else if(props.name === "InstitutebulkTeacher"){
            await createInstituteBulkTeacher(chunk);
          }
          return true; // Signal success
        } catch (error) {
          console.error('Error sending data chunk to the server:', error);
          return false; // Signal failure
        }
      };
  
    const importData = () => {
      
      if (file) {
        const reader = new FileReader();
  
        reader.onload = async(e:any) => {
        setLoading(true)

          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(worksheet);
  
          // Split the excelData into sets of 20 rows each
          const chunkSize = 20;
          const dataChunks = [];
          for (let i = 0; i < excelData.length; i += chunkSize) {
            const chunk = excelData.slice(i, i + chunkSize);
            const success = await sendChunkToServer(chunk);
            if(!success){
              setError(true);
              break;
            }
            // If sending the current chunk was successful, continue with the next one
          
          }
          setLoading(false)
          if(error === true){
            toast.error("something went wrong ", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }else{
            toast.success("Excel upload successfully ", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          if(props.name === "InstitutebulkStudent"){

            navigate("/institute/student")
          }else if(props.name === "InstitutebulkTeacher"){
                navigate("/institute/teacher")
          }

        };
  
        reader.readAsArrayBuffer(file);

      }
    };
    console.log(loading)
    return (
      <div>
         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select excel *
          </label>
          <input
            onChange={handleFileUpload}
            accept=".xlsx"
            className="block w-full text-lg p-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            required
          ></input>
           <button
            type="button"
            onClick={importData}
            className=" bg-secondary text-white text-xl w-full p-2 my-2 hover:bg-primary hover:shadow-xl 
            duration-500 rounded-lg"
          >
            {loading ? "uploading...."  : "upload"}
          </button>
      
      </div>
    );
  }
  



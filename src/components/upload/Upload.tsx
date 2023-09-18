import React, {  useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function Upload(props:{
  setUrl: any 
url?:any
}) {
    const [file, setFile] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [fileUrl , setFileUrl] = useState<any>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const handleFileChange = (event: any) => {
      setFile(event.target.files[0]);
    };

    useEffect(() => {
      if(props.url){
        setFileUrl(props.url);
      }
    },[props.url, fileUrl])

      const handleUpload = async () => {
          if(file === null){
          setError("File required");
          return false;
          }
        setUploading(true)
        const chunkSize = 512 * 512; // 500mb chunks
        const totalChunks: any = Math.ceil(file.size / chunkSize);
        let currentChunk: any = 0;
    
        while (currentChunk < totalChunks) {
          const start = currentChunk * chunkSize;
          const end = Math.min(start + chunkSize, file.size);
          const chunk = file.slice(start, end);
    
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("filename", file.name);
          formData.append("currentChunk", currentChunk);
          formData.append("totalChunks", totalChunks);
    
          // Send the chunk to the server using fetch or Axios
         try{
          await fetch("http://thelearningcampus.in/combine.php", {
            method: "POST",
            body: formData,
          });
         }catch(e:any){
          Swal.fire({
                    icon: 'error',
                    title: 'Internal Server Error',
                    text: 'Something went wrong, please try again later ',
                })
         }
    
          currentChunk++;
        }
    
        // Signal the server that all chunks have been uploaded
        // You can implement this part based on your server-side logic
        try{
          const upload =    await fetch("http://thelearningcampus.in/combine.php", {
            method: "POST",
            body: JSON.stringify({ action: "complete", filename: file.name }),
          });
  
          if(upload.status === 200){
            setFileUrl(`http://thelearningcampus.in/uploads/${file.name}`)
            
            props.setUrl(`http://thelearningcampus.in/uploads/${file.name}`);
          }
        }catch(e:any){
          Swal.fire({
            icon: 'error',
            title: 'Internal Server Error',
            text: 'Something went wrong, please try again later ',
        })
        }
    
       
        setUploading(false)
      };
  return (
  
        <>
        <div className="border p-3 rounded-lg">
        <div className=" flex gap-2 ">
            <div className="w-full">

            <input
              
              onChange={handleFileChange}
              accept="image/* "
              className="block w-full text-lg p-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              required
            ></input>
            
            </div>
          <button disabled={uploading ? true: false } className={`bg-gray-600  text-white px-4 rounded-lg ${uploading ? "bg-gray-400 ": null }`} onClick={handleUpload}>{
            uploading ? "uploading...." : "upload" 
          }</button>
        </div>
        <div className="p-2 flex gap-2 ">
          {
       
          fileUrl ? (<>
            <a href={fileUrl} target="_blank" >
              <img src={fileUrl} width="100" alt="" />
            </a>
          </>): fileUrl 
        }
      </div>
      </div>
        </>
      
  )
}

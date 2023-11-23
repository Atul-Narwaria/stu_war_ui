import { LinearProgress } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface FileProgress {
    [filename: string]: number;
  }
  
  interface FileEntry {
    filename: string;
    size:number,
    file:any,
    controller: AbortController;
  }

export default function DropZoneUpload(props:{
    status: any 
    data:any
   
  }) {
    const [fileProgress, setFileProgress] = useState<FileProgress>({});
    const [pendingFiles, setPendingFiles] = useState<File[]>([]);
    const [fileEntries, setFileEntries] = useState<FileEntry[]>([]);
   
    const onDrop = useCallback((acceptedFiles: File[]) => {
      const newEntries = acceptedFiles.map((file) => ({
        filename: file.name,
        size:file.size,
        file:file,
        controller: new AbortController(),
      }));
      setFileEntries((prevEntries) => [...prevEntries, ...newEntries]);
      setFileProgress({});
      setPendingFiles((prevPendingFiles) => [...prevPendingFiles, ...acceptedFiles]);
      handleUpload(newEntries);
    }, []);
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: true,
    });
    
    const handleUpload = async (entries: FileEntry[]) => {
      const chunkSize = 512 * 512; // 500kb chunks
        let iterate = 0;
        let uploaded = [];
      for (const entry of entries) {
        const { filename,size,file, controller } = entry;
 
        // const file = pendingFiles.find((f) => f.name === filename);
  
        // if (!file) {
        //   continue; // Skip if file not found
        // }
  
        const totalChunks = Math.ceil(size / chunkSize);
        let currentChunk = 0;
  
        
        if(!controller.signal.aborted){
            iterate = iterate+1;
            setFileProgress((prevProgress) => ({
                ...prevProgress,
                [filename]: 0,
              }));
            setPendingFiles((prevPendingFiles) => prevPendingFiles.filter((f) => f.name !== filename));

        }
        while (currentChunk < totalChunks && !controller.signal.aborted) {
          const start = currentChunk * chunkSize;
          const end = Math.min(start + chunkSize, size);
          const chunk = file.slice(start, end);
          const formData = new FormData();
          formData.append('chunk', chunk);
          formData.append('filename', filename);
          formData.append('currentChunk', currentChunk.toString());
          formData.append('totalChunks', totalChunks.toString());
  
          try {
            await fetch('http://thelearningcampus.in/combine.php', {
              method: 'POST',
              body: formData,
              signal: controller.signal,
            });
  
            const newProgress = ((currentChunk + 1) / totalChunks) * 100;
            setFileProgress((prevProgress) => ({
              ...prevProgress,
              [filename]: newProgress,
            }));
            currentChunk++;
          } catch (error:any) {
            console.log(error.message)
          }
        }
  
        if (!controller.signal.aborted) {
          try {
            const upload = await fetch('http://thelearningcampus.in/combine.php', {
              method: 'POST',
              body: JSON.stringify({ action: 'complete', filename }),
            });
  
            if (upload.status === 200) {
              console.log(`http://thelearningcampus.in/uploads/${filename}`);
              uploaded.push(`http://thelearningcampus.in/uploads/${filename}`)

            }
          } catch (error:any) {
            // Swal.fire({
            //   icon: 'error',
            //   title: 'Internal Server Error1',
            //   text: 'Something went wrong, please try again later ',
            // });
            console.log(error.message);
          }
        }
  
        // Remove the uploaded file from the pending list
       
         setPendingFiles((prevPendingFiles) => prevPendingFiles.filter((f) => f.name !== filename));
      }
      props.data(uploaded);
      props.status(true);
    };
  
    const handleCancel = (filename: string) => {
      const entry = fileEntries.find((e) => e.filename === filename);
  
      if (entry) {
        entry.controller.abort();
        setFileEntries((prevEntries) => prevEntries.filter((e) => e.filename !== filename));
        setFileProgress((prevProgress) => {
          const { [filename]: _, ...rest } = prevProgress;
          return rest;
        });
        setPendingFiles((prevPendingFiles) => prevPendingFiles.filter((file) => file.name !== filename));
      }
    };
    
    return (
      <div className='p-2 rounded-xl w-full border border-gray-500 border-dashed bg-gray-200'>
        <div className=' min-h-[10vh]  grid place-content-center  '  {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <div className='ml-3'>
        {Object.keys(fileProgress).map((filename) => (
            
          <div key={filename}>
            <hr></hr>
            <p>{filename}</p>
                <div className="flex gap-3 ">
                <LinearProgress color="success" sx={{ 
            width:"50%",
            height:12,
            borderRadius:10,
            marginBottom:1,
            marginTop:1,

         }} variant="determinate" value={fileProgress[filename]} />
            {/* <progress className='ro' value={fileProgress[filename]} max="100" /> */}
            <FaTimes className=' text-red-500 mt-[5px] hover:cursor-pointer' onClick={() => handleCancel(filename)} />
            {/* <button className='px-3 py-2 bg-red-500 text-white' onClick={() => handleCancel(filename)}>Cancel</button> */}
                </div>
          </div>
        ))}
        {pendingFiles.length > 0 && (
          <div>
            
              {pendingFiles.map((file) => (
                
                <>
                <div key={file.name}>
                {/* <li key={file.name}>{file.name}</li> */}

                   <p>{file.name}</p>
                <div className="flex gap-3 ">
                <LinearProgress color="success" sx={{ 
            width:"50%",
            height:12,
            borderRadius:10,
            marginBottom:1,
            marginTop:1,

         }} variant="determinate" value={0} />
            {/* <progress className='ro' value={fileProgress[filename]} max="100" /> */}
            <FaTimes className=' text-red-500 mt-[5px]' onClick={() => handleCancel(file.name)} />
            {/* <button className='px-3 py-2 bg-red-500 text-white' onClick={() => handleCancel(filename)}>Cancel</button> */}
                </div>
                </div>
                </>
              ))}
            
          </div>
        )}
        </div>
       
       
        
        
      </div>
    );
  };
  
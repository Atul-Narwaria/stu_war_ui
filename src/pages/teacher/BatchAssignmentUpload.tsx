import React, { useState } from 'react'
import DropZoneUpload from '../../components/dropzone/DropZoneUpload';

export default function BatchAssignmentUpload() {
    const [uploadedFiles, setUploaded] = useState<any>(null);
    const [checkUploadedFilesStatus, setCheckUploadedFilesStatus] = useState<any>(false);

    console.log(uploadedFiles)
    console.log(checkUploadedFilesStatus)
  return (
   <>
   <DropZoneUpload status={setCheckUploadedFilesStatus} data={setUploaded} />
   </>
  )
}

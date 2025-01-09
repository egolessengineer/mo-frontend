import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface dragdrop {
  label: String | any;
  drag?: any;
  handleSetImageValue?: (val: any) => any;
  maxFiles?: number;
  disabled?:boolean
  maxSize?:number;
  acceptFiles?:any;
  allfilesAccepted?:boolean
}
export function Drag(props: dragdrop) {
  let {
    label,
    drag,
    handleSetImageValue = (val) => {},
    maxFiles = 1,
    maxSize = 5242880,
    acceptFiles = [],
    allfilesAccepted = false
  } = props;

  

  const onDrop = useCallback((acceptedFiles: any) => {
    const invalidFiles = !allfilesAccepted && acceptedFiles.filter((file:any) => acceptFiles && !Object.keys(acceptFiles).includes(file.type));
    if(invalidFiles.length > 0){
      return
    }
    
    handleSetImageValue(acceptedFiles);
  }, []);

  if(acceptFiles){
    acceptFiles = acceptFiles.reduce((acc :any , curobj:any)=>{
        acc[curobj] = [`.${curobj.split("/")[1]}`]
        return acc
    },{})
  }


  const { getRootProps, getInputProps, isDragActive , acceptedFiles , isDragReject, fileRejections  } = useDropzone({
    onDrop,
    maxFiles: maxFiles,
    maxSize: maxSize,
    accept: acceptFiles,
  });

 

  const invalidFiles:any = !allfilesAccepted && acceptedFiles.filter((file:any) => !Object.keys(acceptFiles).includes(file.type));

  const ErrorFile = fileRejections[0]?.file.size > maxSize ||  fileRejections[0]?.errors

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-sm text-text-primary-50">
          Drop the files here
          <span className="text-text-secondary-50">...</span>
        </p>
      ) : (
        <span>{label}</span>
      )}
      {ErrorFile && (
        <div className="text-danger mt-2 text-sm text-text-danger-100">
          File is too large Maximum file size is 5 MB
        </div>
      )}
      {!allfilesAccepted && invalidFiles?.length > 0 && (
        <div className="text-danger mt-2 text-sm text-text-danger-100">
        Please upload only JPEG or PNG files
      </div>
      )}     
    </div>
  );
}

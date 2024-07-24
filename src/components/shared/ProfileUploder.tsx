import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
    {...getRootProps()}
    className="flex  flex-col   rounded-full cursor-pointer">
    <input {...getInputProps()} className="cursor-pointer" />

    {fileUrl ? (
      <div className=" flex w-full gap-4 " style={{justifyContent:'start',alignItems:'center'}}>
        <div className="flex h-[100px] lg:h-[200px]  justify-center rounded-full pt-2 ">
          <img src={fileUrl} alt="image" className="file_uploader-img1" />
        </div>
        <p style={{color:'#0095F6' }}>Change profile photo</p>
      </div>
    ) : (
      <div className="file_uploader-box  ">
        <img
          src="/assets/icons/file-upload.svg"
          width={96}
          height={77}
          alt="file upload"
        />

        <h3 className="base-medium text-light-2 mb-2 mt-6">
          Drag photo here
        </h3>
        <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

        <Button type="button" className="shad-button_dark_4">
          Select from computer
        </Button>
      </div>
    )}
  </div>
);
};

export default FileUploader;
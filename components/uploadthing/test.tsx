// Note: useUploadThing is IMPORTED FROM YOUR CODEBASE using the generateReactHelpers function
import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "../ui/button";
import { useUploadThing } from "@/utils/uploadthings";
import { Paperclip } from "lucide-react";

export function SingleUploader() {
  const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0] || null);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: () => {
        alert("uploaded successfully!");
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: () => {
        alert("upload has begun");
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    multiple: false,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        <Button variant="ghost" size="icon" onClick={() => file && startUpload([file])}>
          <Paperclip className="size-4" />
          <span className="sr-only">Attach file</span>
        </Button>
      </div>
    </div>
  );
}

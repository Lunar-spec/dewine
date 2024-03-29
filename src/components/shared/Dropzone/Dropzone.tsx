"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { useState } from "react";

const Dropzone = ({ setImage }: { setImage: (imageUrl: string) => void }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <div>
      {imageUrl ? (
        <div className="flex-center gap-4 flex-col">
          <Image
            src={imageUrl}
            alt="Uploaded image"
            width={200}
            height={200}
            className="object-cover rounded object-center"
          />
          <span>Uploaded FIle:{fileName?.substring(0, 10)}...</span>
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            //TODO add a shadcn toast
            console.log(res);
            setImageUrl(res[0].url);
            setFileName(res[0].name);
            setImage(res[0].url);
          }}
          onUploadError={(error: Error) => {
            //TODO add a shadcn toast
            alert(`ERROR! ${error.message}`);
          }}
          className="rounded cursor-pointer ut-allowed-content:text-white/40 p-4 ut-button:bg-brand-primary bg-white/10 ut-label:text-white ut-label:font-normal ut-upload-icon:h-10 ut-button:ut-readying:bg-brand-primary/50 ut-button:ut-uploading:after:bg-brand-primary/50"
        />
      )}
    </div>
  );
};

export default Dropzone;

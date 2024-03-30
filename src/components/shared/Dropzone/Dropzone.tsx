"use client";
import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { useEffect, useState } from "react";

type FileUploaderProps = {
  setImage: (url: string) => void;
};

const Dropzone = ({ setImage }: FileUploaderProps) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (uploadedImageUrl) {
      setImage(uploadedImageUrl);
    }
  }, [uploadedImageUrl]);

  return (
    <div>
      {uploadedImageUrl ? (
        <div className="flex-center gap-4 flex-col">
          <Image
            src={uploadedImageUrl}
            alt="Uploaded image"
            width={200}
            height={200}
            className="object-cover rounded object-center"
          />
          <span>Uploaded File:{fileName?.substring(0, 10)}...</span>
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            toast({
              title: "Image uploaded",
              description: "Your image has been uploaded",
            });
            // console.log(res);
            setUploadedImageUrl(res[0].url);
            setFileName(res[0].name);
            setImage(res[0].url);
          }}
          onUploadError={(error: Error) => {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          }}
          className="rounded cursor-pointer ut-allowed-content:text-white/40 p-4 ut-button:bg-brand-primary bg-white/10 ut-label:text-white ut-label:font-normal ut-upload-icon:h-10 ut-button:ut-readying:bg-brand-primary/50 ut-button:ut-uploading:after:bg-brand-primary/50 ut-button:rounded-[1px]"
        />
      )}
    </div>
  );
};

export default Dropzone;

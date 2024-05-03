"use client";
import { productDefault } from "@/constants";
import { useUploadThing } from "@/lib/uploadthing";
import { productSchema } from "@/lib/validator";
import { IProduct } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ProductFormProps = {
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
};

const ProductForm = ({ type, product, productId }: ProductFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const initialValue =
    product && type === "Update"
      ? {
          ...product,
        }
      : productDefault;

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValue,
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    let uploadedImageUrl = values.img;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        // const newEvent = await createEvent({
        //   event: {
        //     ...values,
        //     imageUrl: uploadedImageUrl,
        //   },
        //   userId,
        //   path: "/profile",
        // });
        // if (newEvent) {
        //   form.reset();
        //   router.push(`/events/${newEvent._id}`);
        // }
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "Update") {
      if (!productId) {
        router.back();
        return;
      }
    }
  }

  return (
    <div>
      ProductForm for both creation and editing by using a prop called
      type=update or type=create Take out the Event Form and utilize it 1. First
      work on creating it 2. Creating product
    </div>
  );
};

export default ProductForm;

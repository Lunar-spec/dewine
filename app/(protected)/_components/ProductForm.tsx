"use client";
import { productDefault } from "@/constants";
import { useUploadThing } from "@/lib/uploadthing";
import { productSchema, testSchema } from "@/lib/validator";
import { IProduct } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/shared/FileUploader/FileUploader";
import { createNewProduct, updateProductById } from "@/lib/actions/products";
import Dropdown from "./Dropdown";
import { isError } from "@/lib/utils";
import Pancake from "@/components/shared/Toast/Pancake";

type ProductFormProps = {
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
  userId: string;
};

const ProductForm = ({
  type,
  product,
  productId,
  userId,
}: ProductFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
        const response = await createNewProduct({
          product: {
            ...values,
            img: uploadedImageUrl,
          },
          userId,
          path: "/profile",
        });

        if (isError(response)) {
          Pancake({ message: response.error, type: "error" });
        } else {
          form.reset();
          Pancake({ message: "Product added", type: "success" });
        }
        router.push(`/admin/products`);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (type === "Update") {
      if (!productId) {
        router.back();
        return;
      }

      try {
        const response = await updateProductById({
          product: {
            ...values,
            id: productId,
            img: uploadedImageUrl,
          },
          userId,
          path: `/product/${product?.id}`,
        });

        if (isError(response)) {
          Pancake({ message: response.error, type: "error" });
        } else {
          form.reset();
          Pancake({ message: "Product updated", type: "success" });
        }
        router.push(`/admin/products`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-center flex-col"
      >
        <div className="flex-between lg:px-14 px-4 flex-col gap-4 lg:gap-14 lg:flex-row h-full w-full">
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem className="flex-center flex-col">
                <FormLabel>Product Image</FormLabel>
                <FormControl className="h-64">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormDescription>
                  Upload an image of your product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the brand of your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the title of your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a description of your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Variant</FormLabel>
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>Select a variant</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the price of your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input placeholder="Year" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the brewing year of your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size of bottle</FormLabel>
                  <FormControl>
                    <Input placeholder="Size" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the size of your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alcohol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alcohol Percentage</FormLabel>
                  <FormControl>
                    <Input placeholder="Alcohol" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the alcohol percentage.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="winery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Winery</FormLabel>
                  <FormControl>
                    <Input placeholder="Winery" {...field} />
                  </FormControl>
                  <FormDescription>Enter a winery name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={form.formState.isSubmitting} type="submit">
          {type === "Create" ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;

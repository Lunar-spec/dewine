"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserSchema } from "@/lib/validator";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { FileUploader } from "@/components/shared/FileUploader/FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UpdatePassword from "../_components/UpdatePassword";

const Settings = () => {
  const [files, setFiles] = useState<File[]>([]);

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      image: user?.image || "",
    },
  });

  const { startUpload } = useUploadThing("imageUploader");

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    console.log(values);
    let uploadedImageUrl = values.image;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }
    values.image = uploadedImageUrl;
    try {
      // const res = await registerUser(values);
      // if (res?.error) {
      //   toast.error("Something went wrong.", {
      //     description: "Please try again later.",
      //   });
      // } else if (res?.success) {
      //   toast.success("Confirmation mail send", {
      //     description: "Please confirm your email.",
      //   });
      // }
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <article className="flex-center h-screen">
      <section className="bg-white/10 w-1/2 flex-col flex-center gap-8 p-4 rounded">
        <div className="flex relative flex-row items-center justify-center w-full">
          <Link
            href={"/"}
            className="hover:bg-white absolute left-0 transition-all ease-in-out rounded-full"
          >
            <FaHome className="text-brand-primary text-2xl m-2" />
          </Link>
          <p className="h3-bold">Update</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-center flex-col px-14 gap-8 w-full"
          >
            <div className="flex-center flex-row w-full gap-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-3/4">
                    <FormControl>
                      <FileUploader
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex-center flex-col w-full gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          className="text-lg h-max"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          className="text-lg h-max"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-3/4 justify-end">
                  <UpdatePassword userId={user?.id || ""} />
                </div>
              </div>
            </div>
            <Button type="submit" className="rounded-[1px] text-lg">
              Update
            </Button>
          </form>
        </Form>
      </section>
    </article>
  );
};

export default Settings;

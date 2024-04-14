"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newUserSchema } from "@/lib/validator";
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
import SocialButtons from "@/components/shared/SocialButton/SocialButtons";
import { useState } from "react";
import { registerUser } from "@/lib/actions/users";
import { FileUploader } from "@/components/shared/FileUploader/FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { redirect, useRouter, useSearchParams } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? {
          title: "Email already in use with different provider",
          description: "Please use different Email",
        }
      : "";

  if (urlError) {
    toast.error(urlError.title, {
      description: urlError.description,
    });
    redirect("/auth/sign-in");
  }

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newUserSchema>) => {
    setIsLoading(true);
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
      const res = await registerUser(values);
      if (res?.error) {
        toast.error("Something went wrong.", {
          description: "Please try again later.",
        });
      } else if (res?.success) {
        toast.success(res?.success, {
          // description: "Please confirm your email.",
          description: "Please sign in.",
        });
        router.push("/auth/sign-in");
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="flex-center h-screen p-4">
      <section className="bg-white/10 w-full md:w-3/4 flex-col flex-center gap-8 p-4 rounded">
        <div className="flex relative flex-row items-center justify-center w-full">
          <Link
            href={"/"}
            className="hover:bg-white absolute left-0 transition-all ease-in-out rounded-full"
          >
            <FaHome className="text-brand-primary text-2xl m-2" />
          </Link>
          <p className="h3-bold">Sign Up</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-center flex-col gap-8 md:w-3/4"
          >
            <div className="flex-center md:flex-row flex-col gap-4 w-full">
              <div className="md:w-3/4 flex-center">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="lg:w-3/4">
                      <FormControl className="h-64">
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
              </div>
              <div className="md:w-3/4 w-full flex-center flex-col gap-8">
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                          className="text-lg h-max"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className="rounded-[1px] text-lg"
            >
              {isLoading ? "Submitting..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        {/* <div>
          <span className="text-sm text-red-400">
            Due to technical issues we are unable to verify emails, so we
            don&apos;t recommend signing up with credentials.
          </span>
        </div> */}
        <div className="flex justify-center items-center w-3/4">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="px-4">OR</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </div>
        <SocialButtons mode="Sign Up" />
        <div>
          Already have an account?
          <Link href={"/auth/sign-in"} className="text-brand-primary">
            {" "}
            Login{" "}
          </Link>
          Now
        </div>
      </section>
      {isLoading && (
        <div className="absolute text-xl font-medium inset-0 cursor-not-allowed flex justify-center items-center bg-black/80">
          Submitting...
        </div>
      )}
    </article>
  );
};

export default SignUp;

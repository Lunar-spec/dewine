"use client";
import Dropzone from "@/components/shared/Dropzone/Dropzone";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newUserSchema } from "@/lib/validator";
import { useToast } from "@/components/ui/use-toast";

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

const SignUp = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      img: "",
    },
  });

  function onSubmit(values: z.infer<typeof newUserSchema>) {
    console.log(values);

    toast({
      title: "Signed up.",
      description: "Please check your email to verify your account.",
    });
  }
  // TODO server actions for signing up with toast on success or error

  return (
    <div className="flex-center p-4">
      <div className="bg-white/10 w-full md:w-3/4 flex-col flex-center gap-8 p-4 rounded">
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
            // action={createNewUser}
            // onSubmit={form.handleSubmit(onSubmit)}
            className="flex-center flex-col gap-8 md:w-3/4"
          >
            <div className="flex-center md:flex-row flex-col gap-4 w-full">
              <div className="md:w-3/4 flex-center">
                <FormField
                  control={form.control}
                  name="img"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Dropzone setImage={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:w-3/4 w-full flex-center flex-col gap-8">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder="First Name"
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
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder="Last Name"
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
            <Button type="submit" className="rounded-[1px] text-lg">
              Sign Up
            </Button>
          </form>
        </Form>
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
      </div>
    </div>
  );
};

export default SignUp;

"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUserSchema } from "@/lib/validator";
import { toast } from "sonner";

import { redirect, useSearchParams } from "next/navigation";

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
import { checkCredentials } from "@/lib/actions/users";

const SignIn = () => {
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? {
          title: "Email already in use with different provider",
          description: "Please use different Email",
        }
      : "";

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginUserSchema>) {
    checkCredentials(values).then((data) => {
      if (data?.error) {
        toast.error("Error", {
          description: data?.error,
        });
      } else if (data?.success) {
        toast.success(data?.success || "Logged In!", {
          description: data?.desc || "You've signed in successfully.",
        });
      }
    });
  }
  if (urlError) {
    toast.error(urlError.title, {
      description: urlError.description,
    });
    redirect("/auth/sign-in");
  }

  return (
    <article className="flex-center h-screen">
      <section className="bg-white/10 w-3/4 md:w-1/3 flex-col flex-center gap-8 p-4 rounded">
        <div className="flex relative flex-row items-center justify-center w-full">
          <Link
            href={"/"}
            className="hover:bg-white absolute left-0 transition-all ease-in-out rounded-full"
          >
            <FaHome className="text-brand-primary text-2xl m-2" />
          </Link>
          <p className="h3-bold">Sign In</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-center flex-col gap-8 w-full"
          >
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
                  <Link
                    href={"/auth/reset"}
                    className="text-brand-primary underline text-sm flex justify-end"
                  >
                    Forgot Password?
                  </Link>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="rounded-[1px] text-lg">
              Sign In
            </Button>
          </form>
        </Form>
        {/* <div className="w-3/4 flex-center">
          <span className="text-sm text-center text-red-400">
            Due to technical issues we are unable to verify emails, so we
            don&apos;t recommend signing up with credentials.
          </span>
        </div> */}
        <div className="flex justify-center items-center w-3/4">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="px-4">OR</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </div>
        <SocialButtons mode="Sign In" />
        <div>
          Don&apos;t have an account?
          <Link href={"/auth/sign-up"} className="text-brand-primary">
            {" "}
            Register{" "}
          </Link>
          Now
        </div>
      </section>
    </article>
  );
};

export default SignIn;

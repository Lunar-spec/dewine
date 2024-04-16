"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/validator";
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
import { resetPassword } from "@/lib/actions/users";
import { useState } from "react";

const ResetPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setLoading(true);
    try {
      const res = await resetPassword(values);
      if (res?.error) {
        toast(res.error, {
          description: res.error,
        });
      } else if (res?.success) {
        toast.info("Alert", {
          description: res.success,
        });
      } else {
        toast.error("Something went wrong", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <p className="p-bold-24">Forgot Password?</p>
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
            <Button type="submit" className="rounded-[1px] text-lg">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
        <div>
          Back to{" "}
          <Link href={"/auth/sign-in"} className="text-brand-primary">
            Sign-In
          </Link>
        </div>
      </section>
    </article>
  );
};

export default ResetPage;

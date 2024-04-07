"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newPasswordSchema } from "@/lib/validator";
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
import { useRouter, useSearchParams } from "next/navigation";
import { newPassword } from "@/lib/actions/newPassword";
import { useState } from "react";

const NewPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
    setLoading(true);
    try {
      const res = await newPassword(values, token);
      if (res?.error) {
        toast.error("Error", {
          description: res.error,
        });
      } else if (res?.success) {
        toast.success("Success", {
          description: res.success,
        });
        router.push("/auth/sign-in");
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

  if (!token) {
    router.push("/auth/sign-in");
    return null;
  }

  return (
    <article className="flex-center h-screen">
      <section className="bg-white/10 w-3/4 md:w-1/3 flex-col flex-center gap-8 p-4 rounded">
        <div className="flex relative flex-row items-center justify-center w-full">
          <p className="p-bold-24">New Password</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-center flex-col gap-8 w-full"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-3/4">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
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
      </section>
    </article>
  );
};

export default NewPassword;

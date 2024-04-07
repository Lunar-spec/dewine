"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validator";
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
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // console.log(values);

    toast.success("Message sent", {
      description: "We'll get back to you shortly.",
    });
  }

  return (
    <article className="flex flex-col lg:flex-row">
      <div className="flex-1 flex-center">
        <Image
          src={"/assets/glass3.avif"}
          alt="contact"
          width={1200}
          height={1200}
          className="w-3/4 object-center object-cover"
        />
      </div>
      <div className="flex-1 flex items-center gap-24 flex-col py-16">
        <p className="h2-bold">ENQUIRE</p>
        <p className="p-regular-18">
          Enquire about the best wine on offer, visiting details and more.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-center flex-col gap-8 w-3/4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-3/4">
                  <FormControl>
                    <Input placeholder="Name" {...field} />
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
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-3/4">
                  <FormControl>
                    <Textarea placeholder="Message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="rounded-[1px]">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </article>
  );
};

export default Contact;

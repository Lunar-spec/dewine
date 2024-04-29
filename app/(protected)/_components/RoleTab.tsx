"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { switchRole } from "@/lib/actions/users";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  role: z.enum(["ADMIN", "USER"], {
    required_error: "You need to select a role.",
  }),
});

const RoleTab = ({ userId }: { userId: string }) => {
  const { id }: any = useCurrentUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await switchRole(userId, data.role, id);
      if (res?.error) {
        toast.error(res.error, {
          description: res.desc,
        });
      } else if (res?.success) {
        toast.success(res.success);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Switch roles here...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="USER" />
                    </FormControl>
                    <FormLabel className="font-normal">USER</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ADMIN" />
                    </FormControl>
                    <FormLabel className="font-normal">ADMIN</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RoleTab;

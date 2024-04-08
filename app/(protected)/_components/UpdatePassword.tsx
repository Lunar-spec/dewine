import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema } from "@/lib/validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updatePassword } from "@/lib/actions/users";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useState } from "react";

const UpdatePassword = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (!userId) return null;

  const onSubmit = async (values: z.infer<typeof updatePasswordSchema>) => {
    setLoading(true);
    try {
      const res = await updatePassword(values, userId);

      if (res?.error) {
        toast.error(res.error, {
          description: "Please try again later.",
        });
      } else if (res?.success) {
        toast.success(res.success, {
          description: "Your password has been updated. Please sign in again.",
        });
        signOut();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-brand-primary cursor-pointer">
          Update Password
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#101010] outline-none border-none shadow-2xl shadow-white/10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Update Password
              </DialogTitle>
              <DialogDescription className="py-1 text-white/50">
                Update your password here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-center w-full gap-4 px-4 flex-col">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="New Password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePassword;

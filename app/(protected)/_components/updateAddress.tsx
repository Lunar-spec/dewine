import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateAddressForm } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchUserAddressByUserId, updateAddress } from "@/lib/actions/users";
import { PancakeProps } from "@/types";
import Pancake from "@/components/shared/Toast/Pancake";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

interface IUserAddress {
  id: string;
  userId: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  code: string;
}

const Address = ({ userId }: { userId: string }) => {
  const [userAddress, setUserAddress] = useState<any>({} as IUserAddress);
  useEffect(() => {
    const fetchAddress = async () => {
      const res = await fetchUserAddressByUserId(userId);
      // console.log(res);
      if (typeof res === "object" && "error" in res) {
        const error: PancakeProps = {
          message: res.error,
          description: res.desc,
          type: "error",
        };
        Pancake(error);
      } else {
        setUserAddress(res);
      }
    };

    fetchAddress();
  }, [userId]);

  const form = useForm<z.infer<typeof updateAddressForm>>({
    resolver: zodResolver(updateAddressForm),
    defaultValues: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      code: "",
    },
  });

  const handleAddress = async (values: z.infer<typeof updateAddressForm>) => {
    try {
      const res = await updateAddress(values, userId);
      if (res?.success) {
        const success: PancakeProps = {
          message: res?.success,
          description: "Updated successfully, You may close the window.",
          type: "success",
        };

        Pancake(success);
      } else if (res?.error) {
        const error: PancakeProps = {
          message: res?.error,
          description: "Something went wrong.",
          type: "error",
        };
        Pancake(error);
      }
    } catch (error) {
      console.log(error);
      const errorMessage: PancakeProps = {
        message: "Something went wrong.",
        description: "Please contact support.",
        type: "error",
      };
      Pancake(errorMessage);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="text-brand-primary cursor-pointer">
          Update Address
        </span>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="h-full">
        <SheetHeader>
          <SheetTitle>Update Address</SheetTitle>
          <SheetDescription>
            Make changes to your address here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-center flex-col md:flex-row gap-4 py-2">
          <div className="md:flex-center flex-col border-2 gap-2 border-white/40 px-4 py-2 rounded hidden md:w-1/4">
            <h2 className="font-semibold text-lg">Current Address</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">Line 1:</span>{" "}
                <span className="text-white">{userAddress?.line1}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">Line 2:</span>{" "}
                <span className="text-white">{userAddress?.line2}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">City:</span>{" "}
                <span className="text-white">{userAddress?.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">State:</span>{" "}
                <span className="text-white">{userAddress?.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">Country:</span>{" "}
                <span className="text-white">{userAddress?.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">Area Code:</span>{" "}
                <span className="text-white">{userAddress?.code}</span>
              </div>
            </div>
          </div>

          <Separator className="border-white/50 md:hidden border" />
          <Form {...form}>
            <form className="flex flex-col gap-4 w-3/4">
              <div className="flex-center w-full gap-4 px-4 flex-col">
                <FormField
                  control={form.control}
                  name="line1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Line 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="line2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Line2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Area Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-1/4"
                  size={"sm"}
                  onClick={form.handleSubmit(handleAddress)}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <span className="text-white/40 text-sm cursor-pointer">Close</span>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Address;

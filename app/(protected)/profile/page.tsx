"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import { GiLaurelCrown } from "react-icons/gi";
import { Orders } from "../_components/Table";
import { useEffect, useState } from "react";
import { fetchUserDetailById } from "@/lib/actions/users";
import Pancake from "@/components/shared/Toast/Pancake";
import { PancakeProps } from "@/types";

const Profile = () => {
  const user = useCurrentUser();

  const [userDetails, setUserDetails] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res: any = await fetchUserDetailById(user?.id as string);
        if (res?.error) {
          const error: PancakeProps = {
            message: res?.error,
            description: res?.desc,
            type: "error",
          };
          Pancake(error);
        } else setUserDetails(res);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [user?.id]);

  return (
    <div className="flex flex-col gap-8 py-4 lg:flex-row w-full justify-center items-center lg:items-start lg:justify-between px-16">
      <div
        id="profile"
        className="lg:w-1/4 p-2 flex gap-8 flex-col sticky top-0"
      >
        <div className="flex items-center bg-white/5 px-4 py-2 rounded-[1px] shadow-lg shadow-white/15 sticky justify-start gap-6">
          <Image
            src={user?.image || "/assets/avatar.jpg"}
            alt="profile"
            width={200}
            height={200}
            className="object-cover h-14 w-14 rounded-full"
          />
          <div>
            <span className="flex gap-4 items-center">
              <h2 className="text-2xl font-semibold">{user?.name}</h2>
              {user?.role === "ADMIN" && (
                <GiLaurelCrown className="text-3xl text-yellow-400" />
              )}
            </span>
            <p>{userDetails?.email || user?.email}</p>
            <p>Orders: 0</p>
          </div>
        </div>
        {!userDetails?.address && (
          <div className="flex items-center bg-white/5 px-4 py-2 rounded-[1px] shadow-lg shadow-white/5 sticky justify-start gap-6">
            <div>
              <h2 className="text-base font-semibold">Welcome</h2>
              <p className="text-sm">
                Incase you have not set up your address yet, please do so at the
                earliest.
              </p>
            </div>
          </div>
        )}
      </div>
      <div id="orders" className="lg:w-3/4 px-4">
        <Orders />
      </div>
    </div>
  );
};

export default Profile;

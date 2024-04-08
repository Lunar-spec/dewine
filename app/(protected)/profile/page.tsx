"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import { GiLaurelCrown } from "react-icons/gi";
import { Orders } from "../_components/Table";

const Profile = () => {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col gap-8 py-4 lg:flex-row w-full justify-center items-center lg:items-start lg:justify-between px-16">
      <div id="profile" className="lg:w-1/4 p-2">
        <div className="flex items-center bg-white/10 px-4 py-2 rounded-[1px] shadow-lg shadow-white/10 sticky justify-start gap-6">
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
            <p>{user?.email}</p>
            <p>Orders: 0</p>
          </div>
        </div>
      </div>
      <div id="orders" className="lg:w-3/4 px-4">
        <Orders />
      </div>
    </div>
  );
};

export default Profile;

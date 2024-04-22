import Image from "next/image";
import { GiLaurelCrown } from "react-icons/gi";
import { Orders } from "../_components/Table";
import { fetchUserDetailById } from "@/lib/actions/users";
import Pancake from "@/components/shared/Toast/Pancake";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth();
  if (!session) return redirect("/auth/sign-in");

  const { user } = session;

  if (!user)
    return Pancake({
      message: "Something went wrong.",
      description: "Please try again later.",
      type: "error",
    });

  const userDetails: any = await fetchUserDetailById(user?.id!);

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
            <p>{user?.email}</p>
            <p>Orders: 0</p>
          </div>
        </div>
        <div className="flex items-end bg-white/5 px-4 py-2 rounded-[1px] shadow-lg shadow-white/5 sticky gap-6">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center w-full">
              <span className="flex items-center">
                <h2 className="text-lg font-semibold">W</h2>elcome
              </span>
              <Link
                className="text-brand-primary text-sm hover:underline"
                href="/settings"
              >
                Settings
              </Link>
            </div>
            {!userDetails ||
              !userDetails.address ||
              (userDetails.address.length === 0 && (
                <p className="text-sm">
                  <span>
                    Incase you have not set up your address yet, please do so at
                    the earliest.
                  </span>
                </p>
              ))}
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

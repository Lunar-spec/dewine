"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logout from "../Logout/Logout";
import { IoPerson } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";

const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="!bg-brand-primary">
            <IoPerson className="text-xl" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black border-none shadow-xl shadow-gray-200/20 text-white rounded-[1px]">
        <DropdownMenuLabel>{user?.name || "Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-[1px] flex items-center gap-4 focus:text-white focus:bg-brand-primary">
          <Link className="flex items-center gap-4" href="/profile">
            <IoPerson className="text-base" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-[1px] cursor-pointer flex items-center gap-4 focus:text-white focus:bg-brand-primary">
          <Link className="flex items-center gap-4" href="/profile/#orders">
            <BiSolidPurchaseTag className="text-base" />
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-[1px] cursor-pointer flex items-center gap-4 focus:text-white focus:bg-brand-primary">
          <Logout className="flex gap-4">
            <RiLogoutBoxRFill className="text-base" />
            Sign Out
          </Logout>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

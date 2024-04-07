"use client";

import UserButton from "@/components/shared/UserButton/UserButton";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const user = useCurrentUser();
  const pathname = usePathname();
  return (
    <nav className="flex-between p-2 w-full rounded-[1px] border-b border-white">
      <div className="flex gap-4">
        <span className={`${pathname === "/settings" && "text-brand-primary"}`}>
          <Link href="/settings">Settings</Link>
        </span>
        <span className={`${pathname === "/profile" && "text-brand-primary"}`}>
          <Link href="/profile">Profile</Link>
        </span>
        {user?.role === "ADMIN" && (
          <span className={`${pathname === "/admin" && "text-brand-primary"}`}>
            <Link href="/admin">Admin</Link>
          </span>
        )}
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;

"use client";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { headerLinks } from "@/constants";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { signOut } from "@/auth";

const MobileNav = () => {
  return (
    <nav>
      <Sheet>
        <SheetTrigger className="flex items-center">
          <Image
            src="/assets/svg/menu.svg"
            alt="menu"
            height={25}
            width={25}
            className=""
          />
        </SheetTrigger>
        <SheetContent className="bg-black w-2/3">
          <SheetHeader>
            <SheetTitle className="text-white text-4xl font-semibold">
              De-<span className="text-brand-primary">Wine</span>
            </SheetTitle>
            <SheetDescription className="text-brand-primary py-2">
              Welcome to De-Wine
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />
          <SheetClose className="flex flex-col gap-4 text-lg">
            {headerLinks.map((link) => (
              <li key={link.text} className="md:hidden">
                <Link href={link.href}>{link.text}</Link>
              </li>
            ))}
            <Link href={"/auth/sign-in"}>Sign-In</Link>
            {/* //TODO only after authentication */}
            <Link href={"/profile"}>My Profile</Link>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;

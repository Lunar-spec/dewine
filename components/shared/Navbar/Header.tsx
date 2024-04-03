"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <div className="sticky w-full px-8 py-4">
      <div className="flex flex-row justify-between items-center border-b border-white">
        <Link href={"/"} className="text-3xl cursor-pointer">
          De-<span className="text-brand-primary">Wine</span>
        </Link>
        <div className="flex flex-row gap-8">
          <div className="md:flex hidden items-center">
            <Navbar />
          </div>
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Header;

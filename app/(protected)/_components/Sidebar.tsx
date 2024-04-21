"use client";
import { sideBarLinks } from "@/constants";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiLaurelCrown } from "react-icons/gi";

const Sidebar = () => {
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <div className="w-full flex-col">
      <div className="flex md:flex-col gap-4 py-2">
        <div className="flex items-center bg-white/5 px-4 py-2 rounded-[1px] sticky justify-start gap-6">
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
          </div>
        </div>
        {sideBarLinks.map((link) => (
          <Link
            href={link.href}
            key={link.text}
            className={`text-base hover:font-semibold hover:text-black flex py-3 px-4 hover:bg-white gap-4 ${
              link.href === pathname && "text-brand-primary bg-white/20"
            }`}
          >
            <link.icon size={16} />
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

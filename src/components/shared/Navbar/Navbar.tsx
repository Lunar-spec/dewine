import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky w-full">
      <div className="flex flex-row gap-8 items-center text-lg">
        <div className="flex-row gap-8 flex">
          {headerLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.text} className={`${isActive && "text-brand-primary"}`}>
                <Link href={link.href}>{link.text}</Link>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

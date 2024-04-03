import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full px-8 py-4">
      <div className="md:border-t flex justify-center flex-col items-center py-4">
        <div className="w-full flex-col justify-between items-center flex xl:px-36 md:flex-row">
          <div className="h1-bold w-full text-center md:text-left">
            <div className="flex justify-center items-center md:justify-between w-full md:text-left">
              <span className="md:hidden border-b border-gray-300 flex-grow"></span>
              <Link href={"/"} className="px-2">
                De-<span className="text-brand-primary">Wine</span>
              </Link>
              <span className="md:hidden border-b border-gray-300 flex-grow"></span>
            </div>
          </div>
          <div className="flex flex-row w-full items-center justify-between">
            <div className="flex flex-col items-center">
              <span className="text-brand-primary py-2 font-semibold text-xl">
                Socials
              </span>
              <div className="flex flex-row items-center justify-center gap-2">
                <Link href={"#"} className="hover:text-brand-primary text-xl">
                  <FaFacebookF />
                </Link>
                <Link href={"#"} className="hover:text-brand-primary text-xl">
                  <FaInstagram />
                </Link>
                <Link href={"#"} className="hover:text-brand-primary text-xl">
                  <FaYoutube />
                </Link>
                <Link href={"#"} className="hover:text-brand-primary text-xl">
                  <FaXTwitter />
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-brand-primary py-2 font-semibold text-xl">
                Links
              </span>
              <div className="flex flex-col gap-1 items-center">
                <Link href={"/products"}>Products</Link>
                <Link href={"#"}>Privacy Policy</Link>
                <Link href={"#"}>Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-2 gap-4 flex flex-row justify-center items-center">
        <div>
          De-<span className="text-brand-primary">Wine</span> © 2024, All rights
          reserved
        </div>
        <div className="flex"> | </div>
        <div className="flex">By Manjesh Singh</div>
      </div>
    </footer>
  );
};

export default Footer;

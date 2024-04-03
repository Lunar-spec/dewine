import Link from "next/link";

interface Props {
  text: string;
  to: string;
}

const Button = ({ text, to }: Props) => {
  return (
    <Link
      href={to}
      className="relative transition-all ease-in duration-300 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium bg-black hover:bg-black group"
    >
      <span className="w-48 h-48 rotate-[-40deg] bg-brand-primary absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
      <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
        {text}
      </span>
    </Link>
  );
};

export default Button;

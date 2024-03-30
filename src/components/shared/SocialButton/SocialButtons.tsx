import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialButtons = ({ mode }: { mode: string }) => {
  return (
    <div>
      <div className="flex-center flex-col gap-4">
        {mode} with:
        <div className="flex-center flex-row gap-8">
          <button
            className="flex flex-row items-center gap-2 rounded-[1px] px-4 py-2 hover:bg-brand-primary"
            onClick={() => signIn("github")}
          >
            <FaGithub className="text-2xl" />
            GitHub
          </button>
          <button
            className="flex flex-row items-center gap-2 rounded-[1px] px-4 py-2 hover:bg-brand-primary"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="text-2xl" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialButtons;

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useToast } from "@/components/ui/use-toast";

const SocialButtons = ({ mode }: { mode: string }) => {
  const { toast } = useToast();
  const onClick = async (provider: "google" | "github") => {
    try {
      await signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error in login",
        description: "Try again later",
        variant: "destructive",
      });
    }
    // console.log(res);
  };
  return (
    <div>
      <div className="flex-center flex-col gap-4">
        {mode} with:
        <div className="flex-center flex-row gap-8">
          <button
            className="flex flex-row items-center gap-2 rounded-[1px] px-4 py-2 hover:bg-brand-primary"
            onClick={() => onClick("github")}
          >
            <FaGithub className="text-2xl" />
            GitHub
          </button>
          <button
            className="flex flex-row items-center gap-2 rounded-[1px] px-4 py-2 hover:bg-brand-primary"
            onClick={() => onClick("google")}
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

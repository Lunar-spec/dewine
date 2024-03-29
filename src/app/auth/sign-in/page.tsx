"use client";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaHome } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  

  // TODO NextAuth social Login Github and google
  // TODO create backend api to login
  // TODO is cookie contains authorization then redirect to home page else show login
  // TODO use zod in backend api to validate user credentials
  // TODO add to middleware to check if user is logged in
  // TODO add toast

  const handleLogin = () => {
    console.log("login");
  };

  return (
    <div className="flex-center h-screen">
      <div className="bg-white/10 w-3/4 md:w-1/3 flex-col flex-center gap-8 p-4 rounded">
        <div className="flex relative flex-row items-center justify-center w-full">
          <Link
            href={"/"}
            className="hover:bg-white absolute left-0 transition-all ease-in-out rounded-full"
          >
            <FaHome className="text-brand-primary text-2xl m-2" />
          </Link>
          <p className="h3-bold">Sign In</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-8 w-4/5">
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="border-b border-white bg-transparent focus-within:outline-none p-2 text-lg"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border-b border-white bg-transparent focus-within:outline-none p-2 text-lg"
          />
          <button
            disabled={loading}
            type="submit"
            className={`bg-brand-primary text-white py-2 text-lg rounded ${
              loading ? "opacity-50 cursor-not-allowed" : null
            }`}
          >
            {loading ? "Submitting..." : "Sign In"}
          </button>
          {error && (
            <div className="text-brand-primary text-center px-4 py-2">
              {error}
            </div>
          )}
        </form>
        <div className="flex justify-center items-center w-3/4">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="px-4">OR</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </div>
        <div className="flex-center flex-col gap-4">
          Sign up with:
          <div className="flex-center flex-row gap-8">
            <button
              className="flex flex-row items-center gap-2 rounded px-4 py-2 hover:bg-brand-primary"
              onClick={() => signIn("github")}
            >
              <FaGithub className="text-2xl" />
              GitHub
            </button>
            <button
              className="flex flex-row items-center gap-2 rounded px-4 py-2 hover:bg-brand-primary"
              onClick={() => signIn("google")}
            >
              <FcGoogle className="text-2xl" />
              Google
            </button>
          </div>
        </div>
        <div>
          Don&apos;t have an account?
          <Link href={"/auth/sign-up"} className="text-brand-primary">
            {" "}
            Register{" "}
          </Link>
          Now
        </div>
      </div>
    </div>
  );
};

export default SignIn;

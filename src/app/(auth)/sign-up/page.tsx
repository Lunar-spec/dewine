"use client";
import Dropzone from "@/components/shared/Dropzone/Dropzone";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FaHome } from "react-icons/fa";

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // TODO NextAuth social Login Github and google
  // TODO create backend api to login
  // TODO is cookie contains authorization then redirect to home page else show login
  // TODO use zod in backend api to validate user credentials
  // TODO add to middleware to check if user is logged in
  // TODO add toast
  //TODO show zod errors

  const handleRegister = () => {
    console.log("register");
  };

  return (
    <div className="flex-center h-screen p-4">
      <div className="bg-white/10 w-full md:w-3/4 flex-col flex-center gap-8 p-4 rounded">
        <div className="flex relative flex-row items-center justify-center w-full">
          <Link
            href={"/"}
            className="hover:bg-white absolute left-0 transition-all ease-in-out rounded-full"
          >
            <FaHome className="text-brand-primary text-2xl m-2" />
          </Link>
          <p className="h3-bold">Sign Up</p>
        </div>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center gap-8 w-3/4"
        >
          <div className="flex-center flex-col lg:flex-row gap-8 lg:gap-32 w-full">
            <div className="flex flex-col justify-center gap-4 lg:w-1/2">
              <input
                name="first_name"
                type="text"
                placeholder="First Name"
                className="border-b border-white bg-transparent focus-within:outline-none p-2 text-lg"
              />
              <input
                name="last_name"
                type="text"
                placeholder="Last Name"
                className="border-b border-white bg-transparent focus-within:outline-none p-2 text-lg"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="border-b border-white bg-transparent focus-within:outline-none p-2 text-lg"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="border-b border-white bg-transparent focus-within:outline-none p-2 text-lg"
              />
            </div>
            <Dropzone setImage={(imageUrl: string) => setImageUrl(imageUrl)} />
          </div>
          <button
            disabled={loading}
            type="submit"
            className={`bg-brand-primary text-white w-1/2 py-2 text-lg rounded ${
              loading ? "opacity-50 cursor-not-allowed" : null
            }`}
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>
          {error && (
            <div className="text-brand-primary text-center p-2">{error}</div>
          )}
        </form>
        <div className="flex justify-center items-center w-3/4">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="px-4">OR</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </div>
        <div>Social SignUp</div>

        <div>
          Already have an account?
          <Link href={"/sign-in"} className="text-brand-primary">
            {" "}
            Login{" "}
          </Link>
          Now
        </div>
      </div>
    </div>
  );
};

export default SignUp;

"use client";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return <button onClick={() => signOut()}>logout</button>;
};
export default SignOut;

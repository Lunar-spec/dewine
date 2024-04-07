"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}
const Logout = ({ children, className }: LogoutButtonProps) => {
  const handleLogout = () => {
    signOut();
  };
  return <span className={className} onClick={handleLogout}>{children}</span>;
};

export default Logout;

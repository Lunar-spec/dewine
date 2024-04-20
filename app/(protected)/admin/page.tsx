"use client";
import Button from "@/components/shared/Button/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { IoWarningSharp } from "react-icons/io5";

const Admin = () => {
  const user = useCurrentUser();

  if (user?.role !== "ADMIN") {
    return (
      <div className="flex-center flex-col h-[90vh] gap-4 text-4xl font-bold">
        <IoWarningSharp className="text-brand-primary text-6xl" />
        Unauthorized
        <div className="text-base font-light">
          <Button text="Go back Dashboard" to="/profile" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-center md:flex-row flex-col">
      <div className="flex-center">Table of users</div>
      {/*//TODO A list of products and their prices with quantity, Number of users, Number of orders their quantity, Add new product */}
    </div>
  );
};

export default Admin;

"use client";
import Sidebar from "../_components/Sidebar";
import Card from "../_components/Card";
import { adminCards } from "@/constants/index";
import { IoWarningSharp } from "react-icons/io5";
import Button from "@/components/shared/Button/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
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
    <div className="flex-center lg:flex-row flex-col lg:h-screen py-2">
      <div className="lg:flex lg:w-1/6 w-full lg:h-full p-4 lg:p-0">
        <Sidebar />
      </div>
      <div className="flex-center flex-col lg:w-5/6 w-full h-full">
        <div className="lg:flex-between hidden px-6 h-1/6 w-full">
          {adminCards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              count={card.count}
              icon={card.icon}
            />
          ))}
        </div>
        <div className="flex justify-center h-5/6 px-4 w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;

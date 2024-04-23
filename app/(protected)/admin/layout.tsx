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
    <div className="flex-center md:flex-row flex-col h-screen">
      <div className="md:flex md:w-1/6 w-full md:h-full p-4 md:p-0">
        <Sidebar />
      </div>
      <div className="flex-center flex-col md:w-5/6 w-full h-full">
        <div className="flex-between px-8 h-1/6 w-full">
          {adminCards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              count={card.count}
              icon={card.icon}
            />
          ))}
        </div>
        <div className="flex h-5/6 px-4 w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;

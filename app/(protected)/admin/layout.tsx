import Sidebar from "../_components/Sidebar";
import Card from "../_components/Card";
import { adminCards } from "@/constants/index";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center md:flex-row flex-col h-screen">
      <div className="md:flex md:w-1/5 w-full md:h-full p-4 md:p-0">
        <Sidebar />
      </div>
      <div className="flex-center flex-col md:w-4/5 w-full h-full">
        <div className="flex-center h-1/6 w-full">
          {adminCards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              count={card.count}
              icon={card.icon}
            />
          ))}
        </div>
        <div className="flex-center h-5/6 w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;

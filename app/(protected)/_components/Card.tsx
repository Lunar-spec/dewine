import { adminCardProps } from "@/types";

const Card = ({ title, count, icon: Icon }: adminCardProps) => {
  return (
    <div className="flex-center gap-4 p-4 border-white/40 border rounded cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:bg-white hover:text-black">
      <div>
        <Icon size={24} />
      </div>
      <div className="flex-center flex-row gap-4">
        <span className="text-xl font-bold">{title}</span>
        <span className="text-lg font-semibold">{count}</span>
      </div>
    </div>
  );
};

export default Card;

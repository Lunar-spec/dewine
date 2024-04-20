import { adminCardProps } from "@/types";

const Card = ({ title, count, icon: Icon }: adminCardProps) => {
  return (
    <div className="flex-center gap-4 px-4 py-2 border-white/40 border rounded hover:shadow-lg hover:shadow-white/40 transition-all duration-300 ease-in-out cursor-pointer group">
      <div>
        <Icon
          size={24}
          className="group-hover:text-brand-primary transition-all duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex-center flex-row gap-4">
        <span className="text-xl font-bold">{title}</span>
        <span className="text-lg font-semibold">{count}</span>
      </div>
    </div>
  );
};

export default Card;

import { PancakeProps } from "@/types";
import { toast } from "sonner";

const Pancake = ({ message, description, type }: PancakeProps) => {
  if (type === "error") {
    toast.error(message, {
      description,
    });
  } else if (type == "success") {
    toast.success(message, {
      description,
    });
  } else if (type == "info") {
    toast.info(message, {
      description,
    });
  }
};

export default Pancake;

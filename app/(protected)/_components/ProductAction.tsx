"use client";
import Pancake from "@/components/shared/Toast/Pancake";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/actions/products";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

interface IProductAction {
  userId: string;
  productId: string;
}

async function handleDelete(productId: string, userId: string) {
  const result = await deleteProduct(
    productId,
    userId,
  );

  if (result?.success) {
    Pancake({ message: "Product deleted", type: "success" });
  } else {
    Pancake({ message: "Something went wrong", type: "error" });
  }
}

const ProductAction = ({ userId, productId }: IProductAction) => {
  return (
    <div className="flex gap-2">
      <Link href={`products/${productId}`}>
        <Button size={"icon"} variant={"secondary"} className="rounded-md">
          <FaEdit />
        </Button>
      </Link>
      <Button
        size={"icon"}
        variant={"destructive"}
        className="rounded-md"
        onClick={() => handleDelete(productId, userId)}
      >
        <IoTrashBin />
      </Button>
    </div>
  );
};

export default ProductAction;

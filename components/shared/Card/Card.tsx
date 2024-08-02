import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
interface Props {
  product: IProduct;
}
const Card = ({ product }: Props) => {
  return (
    <div className="flex group hover:border border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/50 relative flex-col w-72">
      <div className="h-full w-full">
        <Image
          src={product.img}
          alt="bottle"
          width={1024}
          height={1024}
          className="object-contain object-center"
        />
      </div>
      <Link
        href={`/products/${product.id}`}
        className="flex-center opacity-0 group-hover:opacity-100 h-full bg-black/20 text-lg absolute w-full bottom-0 backdrop-blur-md transition-all duration-200 ease-in-out flex-col"
      >
        <div className="flex-center flex-col">
          <div className="text-lg">{product.brand}</div>
          <div className="text-xl">{product.title}</div>
        </div>
      </Link>
      <div className="flex absolute w-full justify-between gap-4 p-2">
        <div>
          <span>{product.price}</span>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <div className="cursor-pointer">
            {/* product.id === wishlist.id */}
            <IoHeartOutline className="text-2xl" />
            {/*  <IoHeartSharp className="text-brand-primary"/>*/}
          </div>
          <div className="cursor-pointer">
            <IoCartOutline className="text-2xl" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-2">
        <span>{product.year}</span>
      </div>
    </div>
  );
};

export default Card;

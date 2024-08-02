import ProductAction from "@/app/(protected)/_components/ProductAction";
import { auth } from "@/auth";
import Pancake from "@/components/shared/Toast/Pancake";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProducts } from "@/lib/actions/products";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

const AllProducts = async () => {
  const session = await auth();
  if (!session) return redirect("/auth/sign-in");
  const { user } = session;

  if (!user)
    return Pancake({
      message: "Something went wrong.",
      description: "Please try again later.",
      type: "error",
    });

  const allProducts = await getAllProducts();
  if (!allProducts) return <div>Something went wrong</div>;

  console.log(allProducts);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full">
        <Table>
          <TableCaption>A list of all of our products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Alcohol</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allProducts?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  <Image
                    src={product.img}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-sm h-20 w-20 object-contain"
                  />
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.year}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.alcohol}</TableCell>
                <TableCell>
                  <ProductAction userId={user.id!} productId={product.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Link
        href="products/create"
        className="absolute bottom-14 right-14 rounded-full p-4 bg-brand-primary cursor-pointer group"
      >
        <FaPlus />
        <span className="relative w-full">
          <span className="text-white w-max right-8 -bottom-2 absolute hidden group-hover:block">
            Create new Product
          </span>
        </span>
      </Link>
    </div>
  );
};

export default AllProducts;

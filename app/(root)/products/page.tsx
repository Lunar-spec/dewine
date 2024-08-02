import Card from "@/components/shared/Card/Card";
import Error from "@/components/shared/Error/Error";
import { getAllProducts } from "@/lib/actions/products";
import Image from "next/image";

const Products = async () => {
  const products = await getAllProducts();

  if (!products) return <Error message="No Products!" />;
  return (
    <div className="mx-4 flex flex-col gap-8">
      <div className="flex items-center justify-between md:mx-32 mx-8">
        <span className="h1-bold">All Products</span>
        <Image
          src={"/assets/glasses.avif"}
          width={1024}
          height={1024}
          quality={100}
          alt="glasses"
          className="object-cover object-center w-1/2 h-64"
        />
      </div>
      <div className="flex flex-grow flex-wrap gap-4 justify-center items-center">
        {products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </div>
      {/* Add pagination, search and filters later >> use searchParams -> see -- products/id route */}
      Pagination, search and Filters
    </div>
  );
};

export default Products;

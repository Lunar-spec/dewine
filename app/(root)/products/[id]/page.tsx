import Error from "@/components/shared/Error/Error";
import { fetchProductById } from "@/lib/actions/products";

type UpdateProductProps = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Product = async ({
  params: { id },
  searchParams,
}: UpdateProductProps) => {
  // search params to be used for pagination in similar category section --> use category id for fetching similar products from category
  const product = await fetchProductById(id);

  if (!product || product.error) return <Error message={product?.error} />;
  return <div>{JSON.stringify(product)}</div>;
};

export default Product;

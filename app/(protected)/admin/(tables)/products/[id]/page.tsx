import ProductForm from "@/app/(protected)/_components/ProductForm";
import { auth } from "@/auth";
import { fetchProductById } from "@/lib/actions/products";
import { IProduct } from "@/types";
import { ErrorProps, isError } from "@/lib/utils";
import { redirect } from "next/navigation";

type UpdateProductProps = {
  params: {
    id: string;
  };
};

const EditProduct = async ({ params: { id } }: UpdateProductProps) => {
  const session = await auth();
  if (!session) return redirect("/auth/sign-in");
  const { user } = session;
  const result: ErrorProps | IProduct = await fetchProductById(id);

  if (isError(result)) {
    return (
      <div className="flex-center flex-col gap-2">
        <p className="text-xl font-semibold">{result.error}</p>
        <p>{result.desc}</p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <ProductForm
        type="Update"
        userId={user.id!}
        product={result}
        productId={result.id}
      />
    </div>
  );
};

export default EditProduct;

import ProductForm from "@/app/(protected)/_components/ProductForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const CreateProduct = async () => {
  const session = await auth();
  if (!session) return redirect("/auth/sign-in");
  const { user } = session;

  if (!user) return redirect("/auth/sign-in");

  return (
    <div className="w-full">
      <ProductForm userId={user.id!} type="Create" />
    </div>
  );
};

export default CreateProduct;

import Button from "@/components/shared/Button/Button";

const AllProducts = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full">
        <span className="text-2xl font-bold">All Products</span>
        <div>
          <Button text="Create" to="products/create" />
          <Button text="Update" to="products/6655775a613a83b64ea4bd0d" />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

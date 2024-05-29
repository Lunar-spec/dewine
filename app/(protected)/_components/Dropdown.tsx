import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { ICategory } from "@/types";
import { createCategory, getAllCategories } from "@/lib/actions/products";

type DropdownProps = {
  onChangeHandler?: () => void;
  value?: string;
};

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleAddCategory = async () => {
    try {
      const category = await createCategory({
        categoryName: newCategory.trim(),
        categoryDescription: categoryDescription.trim(),
      });
      if (category) setCategories((prevState) => [...prevState, category]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field border border-white focus-within:outline-none rounded-none">
        <SelectValue placeholder="Variant" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className="select-item bg-transparent focus-within:outline-none p-regular-14 rounded-none"
            >
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 rounded-none bg-slate-800/50 flex w-full py-3 pl-8 text-white hover:bg-primary-50 focus:text-brand-primary font-normal">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#111111] border-none !rounded-none shadow-xl shadow-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3 text-white"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Category Description"
                  className="input-field mt-3 text-white"
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-none border-none bg-slate-800 hover:text-white hover:bg-slate-800/50">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
                className="rounded-none border-none"
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;

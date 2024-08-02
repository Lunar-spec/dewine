"use server";

import { z } from "zod";
import { productSchema } from "../validator";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { IProduct } from "@/types";

export const createNewProduct = async ({ product, userId, path }: { product: z.infer<typeof productSchema>, userId: string, path: string }) => {
    const validatedFields = productSchema.safeParse(product);

    if (!validatedFields.success) return { error: "Invalid fields" };

    const user = await db.user.findUnique({ where: { id: userId } });

    if (user?.role !== 'ADMIN') return { error: "Only ADMIN can create new products" };

    const { brand, title, description, price, img, year, categoryId, size, winery, alcohol } = validatedFields.data;

    const existingProduct = await db.product.findUnique({
        where: {
            title,
        }
    })

    if (existingProduct) return { error: "Product already exists" };

    try {
        const product = await db.product.create({
            data: {
                brand,
                title,
                description,
                price,
                img,
                year,
                size,
                winery,
                alcohol,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
            }
        })

        await db.category.update({
            where: {
                id: categoryId
            },
            data: {
                products: {
                    connect: {
                        id: product.id
                    }
                }
            }
        })

        revalidatePath(path);
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const fetchProductById = async (id: string) => {
    if (!id) return { error: "No product ID found.", desc: "Please try again." };

    try {
        const product = await db.product.findUnique({ where: { id } });
        if (!product) return { error: "Product not found" };
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong", desc: "Please try again later." };
    }
}

export const updateProductById = async ({ product, userId, path }: { product: IProduct, userId: string, path: string }) => {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (user?.role !== 'ADMIN') return { error: "Only ADMIN can update products" };

    const { brand, title, description, price, img, year, categoryId, size, winery, alcohol } = product;

    const toBeUpdatedProduct = await db.product.findUnique({
        where: {
            id: product.id
        }
    })

    if (!toBeUpdatedProduct) return { error: 'No such product exists' };

    try {
        await db.product.update({
            where: {
                id: product.id
            },
            data: {
                brand,
                title,
                description,
                price,
                img,
                year,
                categoryId,
                size,
                winery,
                alcohol,
            }
        })

        await db.category.update({
            where: {
                id: categoryId
            },
            data: {
                products: {
                    connect: {
                        id: product.id
                    }
                }
            }
        })

        revalidatePath(path);
        return { success: 'OK' }
    } catch (error) {
        console.log(error);
    }
}

export const getAllCategories = async () => {
    try {
        const categories = await db.category.findMany();
        return categories;
    } catch (error) {
        console.log(error);
    }
}

export const createCategory = async ({ categoryName, categoryDescription }: { categoryName: string, categoryDescription: string }) => {
    try {
        const newCategory = await db.category.create({
            data: {
                name: categoryName,
                description: categoryDescription
            }
        })
        return newCategory;
    } catch (error) {
        console.log(error)
    }
}

export const getAllProducts = async () => {
    try {
        const products = await db.product.findMany({ include: { category: true } });
        return products;
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id: string, userId: string) => {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (user?.role !== 'ADMIN') return { error: "Only ADMIN can delete products" };

    try {
        await db.product.delete({ where: { id } });
        revalidatePath('/products');
        return { success: 'OK' };
    } catch (error) {
        console.log(error)
    }
}
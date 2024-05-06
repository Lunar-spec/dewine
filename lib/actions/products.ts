"use server";

import { z } from "zod";
import { productSchema } from "../validator";
import { db } from "../db";

export const createNewProduct = async (values: z.infer<typeof productSchema>) => {
    const validatedFields = productSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields" };

    const { brand, title, description, price, img, year, category, size, winery, alcohol } = validatedFields.data;

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
                        id: category.id
                    }
                },
            }
        })

        await db.category.update({
            where: {
                id: category.id
            },
            data: {
                products: {
                    connect: {
                        id: product.id
                    }
                }
            }
        })
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
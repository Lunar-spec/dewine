"use server";

import { z } from "zod";
import { createProductSchema } from "../validator";
import { db } from "../db";

export const createNewProduct = async (values: z.infer<typeof createProductSchema>) => {
    const validatedFields = createProductSchema.safeParse(values);

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
                        id: category
                    }
                },
            }
        })

        await db.category.update({
            where: {
                id: category
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
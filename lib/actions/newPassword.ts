"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";

import { newPasswordSchema } from "../validator";
import { getPasswordResetTokenByToken, getUserByEmail } from "./helper";
import { db } from "../db";

export const newPassword = async (values: z.infer<typeof newPasswordSchema>, token?: string | null) => {
    if (!token) return { error: "Missing Token" };

    const validatedFields = newPasswordSchema.safeParse(values);


    if (!validatedFields.success) return { error: "Invalid fields" };

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) return { error: "Invalid Token" };

    const hasExpired = new Date() > new Date(existingToken.expires);

    if (hasExpired) return { error: "Token has expired" };

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) return { error: "Email does not exist" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({ where: { id: existingToken.id } });

    return { success: "Password updated!" };
}



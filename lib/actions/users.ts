"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { loginUserSchema, newUserSchema, resetPasswordSchema, updatePasswordSchema, updateUserSchema } from "../validator";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from "next-auth";
import { db } from "../db";
import { getUserByEmail, sendPasswordResetEmail, sendVerificationEmail } from "./helper";
import { generateResetPasswordToken, generateVerificationToken } from "./token";

export const registerUser = async (values: z.infer<typeof newUserSchema>) => {
    const validatedFields = newUserSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields" };

    const { email, password, name, image } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return {
            error: "User already exists",
        };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await db.user.create({
            data: {
                name,
                email,
                image,
                password: hashedPassword,
            }
        });

        const verificationToken = await generateVerificationToken(email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: "Registration successful!", }
        // return { success: "Confirmation mail sent!", }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const checkCredentials = async (values: z.infer<typeof loginUserSchema>) => {
    const validatedFields = loginUserSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    const { email, password } = validatedFields.data;

    const existingUser: any = await getUserByEmail(email);

    if (!existingUser) return {
        error: "Email does not exist",
        desc: 'Sign up to get started'
    };

    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!existingUser || !existingUser.email || !isValid) {
        return {
            error: "Email does not exist or wrong credentials",
            desc: 'Please check your email or password'
        };
    }

    // if (!existingUser.emailVerified) {
    //     const verificationToken = await generateVerificationToken(email);
    //     await sendVerificationEmail(verificationToken.email, verificationToken.token);
    //     return {
    //         success: "Confirmation mail sent!",
    //         desc: "Please check your email to verify your account.",
    //     }
    // }
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: "Invalid credentials" }
                case 'AccessDenied':
                    return { error: "Access Denied" }
                default: return { error: "Something went wrong" }
            }
        }
        throw error;
    }
}

export const updatePassword = async (values: z.infer<typeof updatePasswordSchema>, userId: string) => {
    const validatedFields = updatePasswordSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    const existingUser: any = await db.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!existingUser) return { error: "User does not exist!" };

    const { password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                password: hashedPassword
            }
        });
        return { success: "Password updated!", status: 201 };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const resetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
    const validatedFields = resetPasswordSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid email" };

    const { email } = validatedFields.data;

    const existingUser: any = await getUserByEmail(email);

    if (!existingUser) return { error: "Email does not exist!" };

    const resetPasswordToken = await generateResetPasswordToken(existingUser.email);

    await sendPasswordResetEmail(resetPasswordToken.email, resetPasswordToken.token);

    // return { success: "Password reset email sent!" };
    return { success: "Feature not available, Please contact support!" };
}

export const updateUserDetails = async (values: z.infer<typeof updateUserSchema>, userId: string | undefined) => {
    const validatedFields = updateUserSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    if (!userId) return { error: "User not found" };

    const { name, image, email } = validatedFields.data;

    const existingUser: any = await db.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!existingUser) return { error: "User does not exist!" };

    try {
        var emailVerified: Date | null = new Date();
        if (email && email !== existingUser.email) {
            const verificationToken = await generateVerificationToken(email);
            await sendVerificationEmail(verificationToken.email, verificationToken.token);
            emailVerified = null;
        }

        await db.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                name,
                image,
                email,
                emailVerified: emailVerified
            }
        });

        if (email && email !== existingUser.email) {
            return { success: "Confirmation mail sent!", desc: "Please check your email to verify your account.", status: 201 };
        }

        return { success: "User details updated!", desc: "Please sign in again.", status: 200 };
    } catch (error) {
        console.log(error);
        return null;
    }
}


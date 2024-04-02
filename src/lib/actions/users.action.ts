"use server";
import bcrypt from "bcryptjs";
import * as z from "zod";
import User from "@/lib/database/models/user.model";
import { loginUserSchema, newUserSchema } from "../validator";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from "next-auth";
import { connectDb } from "../database/connectDb";

// export const getUserByEmail = async (email="smanjesh1854@gmail.com") => {
export const getUserByEmail = async (email: string) => {
    try {
        await connectDb();
        const user = await User.findOne({ email });
        if (!user) {
            return null;
        }
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        await connectDb();
        const user = await User.findById(id);
        if (!user) {
            return null;
        }
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const registerUser = async (values: z.infer<typeof newUserSchema>) => {
    const validatedFields = newUserSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields" };

    const { email, password, name, image } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    // console.log(existingUser);
    if (existingUser) {
        return {
            error: "User already exists",
        };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await connectDb();
        const user = await User.create({
            name,
            email,
            image,
            password: hashedPassword,
        });

        // const verificationToken = await generateVerificationToken(email);

        // await sendVerficationEmail(verificationToken.email, verificationToken.token);
        return {
            success: "Confirmation mail sent!",
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
export const checkCredentials = async (values: z.infer<typeof loginUserSchema>) => {
    const validatedFields = loginUserSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        // console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: "Invalid credentials" }
                default: return { error: "Something went wrong" }
            }
        }
        throw error;
    }
}

// export const fetchAll = async () => {
//     try {
//         await connectDb();
//         const users = await User.find();
//         return JSON.parse(JSON.stringify(users));
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }


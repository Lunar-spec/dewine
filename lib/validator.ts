import { z } from 'zod';

export const productFormSchema = z.object({
    // TODO : Add more validation for product
})

export const newUserSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(20, { message: 'Name is too long' }),
    email: z.string().email().min(5, { message: 'Email is required' }),
    password: z.string().min(8, { message: 'Password should be at least 8 characters' }),
    image: z.string().optional(),
});

export const contactFormSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(10, { message: 'Name is too long' }),
    email: z.string().email().min(5, { message: 'Email is required' }),
    message: z
        .string()
        .min(1, { message: 'Message is required' })
        .max(400, { message: 'Message is too long' }),
})

export const resetPasswordSchema = z.object({
    email: z
        .string()
        .min(5, { message: 'Email is required' })
        .email({ message: 'Invalid email' }),
})

export const newPasswordSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'Password should be at least 8 characters' }),
})

export const loginUserSchema = z.object({
    email: z
        .string()
        .min(5, { message: 'Email is required' })
        .email({ message: 'Invalid email' }),
    password: z
        .string()
        .min(8, { message: 'Password is required' }),
})

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(20, { message: 'Name is too long' }),
    image: z.string().optional(),
    email: z.string().email().min(5, { message: 'Email is required' }),
});

export const updatePasswordSchema = z.object({
    password: z.string().min(8, { message: 'Password should be at least 8 characters' }),
    confirmPassword: z.string(),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    }
);
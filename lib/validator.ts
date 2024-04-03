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

export const loginUserSchema = z.object({
    email: z
        .string()
        .min(5, { message: 'Email is required' })
        .email({ message: 'Invalid email' }),
    password: z
        .string()
        .min(8, { message: 'Password is required' }),
})
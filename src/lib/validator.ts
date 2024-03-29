import { z } from 'zod';

export const productFormSchema = z.object({
    // TODO : Add more validation for product
})

export const userFormSchema = z.object({
    first_name: z
        .string()
        .min(1, { message: 'First name is required' })
        .max(10, { message: 'First name is too long' }),
    last_name: z
        .string()
        .min(1, { message: 'Last name is required' })
        .max(10, { message: 'Last name is too long' }),
    username: z
        .string()
        .max(10, { message: 'Username is too long' })
        .min(3, { message: 'Username is required' }),
    email: z.string().email().min(5, { message: 'Email is required' }),
    password: z.string().min(8, { message: 'Password should be at least 8 characters' }),
    img: z.string().optional(),
});

export const loginUserSchema = z.object({
    email: z
        .string()
        .min(5, { message: 'Email is required' })
        .email({ message: 'Invalid email' }),
    password: z
        .string()
        .min(8, { message: 'Password is required' }),
})
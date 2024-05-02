import { z } from 'zod';

export const productSchema = z.object({
    brand: z.string().min(1, { message: 'Brand is required' }).max(20),
    title: z.string().min(1, { message: 'Title is required' }).max(20), // Ensure title is at least 1 character long
    description: z.string().min(1, { message: 'Description is required' }).max(300),
    img: z.string(),
    price: z.number().positive().min(1, { message: 'Price is required' }),
    year: z.string().min(4),
    category: z.string(),
    size: z.number().default(750),
    winery: z.string().optional(),
    alcohol: z.number().positive().min(1, { message: 'Alcohol content is required' }),
});

export const newUserSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(20, { message: 'Name is too long' }),
    email: z.string().email().min(5, { message: 'Email is required' }),
    password: z.string().min(8, { message: 'Password should be at least 8 characters' }),
    image: z.string().optional(),
});

export const updateAddressForm = z.object({
    line1: z.string().min(1, { message: 'Line 1 is required' }).max(30, { message: 'Line 1 is too long' }),
    line2: z.string().min(1, { message: 'Line 2 is required' }).max(30, { message: 'Line 2 is too long' }),
    city: z.string().min(1, { message: 'City is required' }).max(30, { message: 'City is too long' }),
    state: z.string().min(1, { message: 'State is required' }).max(30, { message: 'State is too long' }),
    country: z.string().min(1, { message: 'Country is required' }).max(30, { message: 'Country is too long' }),
    code: z.string().min(1, { message: 'Area code is required' }).max(30, { message: 'Area code is too long' }),
})

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
        .max(20, { message: 'Name is too long' })
        .optional(),
    image: z
        .string()
        .optional(),
    email: z
        .string()
        .email().min(5, { message: 'Email is required' })
        .optional(),
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
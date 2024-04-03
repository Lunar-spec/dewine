export type Product = {
    _id: string;
    brand: string;
    title: string;
    description: string;
    img: string;
    year: string;
    alcohol: string;
    size: string;
    price: string;
    winery: string;
    category: {
        _id: string,
        name: string;
    };
}

export type LoginUser = {
    email: string;
    password: string;
}

export type CreateUser = {
    name: string;
    email: string;
    emailVerified?: Date;
    password: string;
    image?: string | null;
    role?: "user" | "admin";
    createdAt?: Date;
}
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

export type loginUser = {
    email: string;
    password: string;
}

export type CreateUserParams = {
    _id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    img?: string | null;
    role?: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}
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

export interface PancakeProps {
    message: string;
    description: string;
    type: "error" | "success" | "info";
}

export interface Address {
    userId: string,
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    code: string;
}
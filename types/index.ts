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
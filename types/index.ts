import { IconType } from "react-icons/lib";

export interface IProduct {
    id: string;
    brand: string;
    title: string;
    description: string;
    img: string;
    year: string;
    alcohol: string;
    size: string;
    price: string;
    winery?: string;
    categoryId: string;
}

export interface ICategory {
    id: string,
    name: string;
    description: string;
}

export interface PancakeProps {
    message: string;
    description?: string;
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

export interface adminCardProps {
    icon: IconType;
    title: string;
    count: number;
}

export interface sideBarProps {
    text: string;
    href: string;
    icon: IconType;
}

export interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
}

export interface IAddress {
    id: string;
    userId: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    code: string;
    country: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    emailVerified?: Date | null;
    password?: string | null;
    image?: string | null;
    role: 'USER' | 'ADMIN';
    createdAt: Date;
    accounts: any[];
    address: any[];
}

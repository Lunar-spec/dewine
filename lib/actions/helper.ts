import { db } from "../db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        // console.log(error);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        if (!user) {
            return null;
        }
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        return null;
    }
}
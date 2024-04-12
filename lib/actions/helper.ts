import { db } from "../db";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const domain = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<a href="${resetLink}">Reset your password</a>`,
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<a href="${confirmLink}">Confirm your email</a>`,
    })
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
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
        return null;
    }
}

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordToken = await db.passwordResetToken.findUnique({ where: { token } });
        return passwordToken;
    } catch (error) {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordEmail = await db.passwordResetToken.findFirst({ where: { email } });
        return passwordEmail;
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({ where: { email } });
        return verificationToken;
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({ where: { token } });
        return verificationToken;
    } catch (error) {
        return null;
    }
}
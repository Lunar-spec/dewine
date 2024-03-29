'use server';
import bcrypt from 'bcrypt';

import { loginUser } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/users.model";

export async function handleLogin(formData: FormData) {

    // const token = jwt.sign()
}
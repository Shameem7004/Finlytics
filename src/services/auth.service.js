import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

export async function registerUser(data) {
    const { name, email, password, role } = data;

    // check if user exist
    const existingUser = await prisma.user.findUnque({ where: { email } });

    // if user exist throw an error
    if(existingUser) {
        throw new Error("User already exists");
    }

    // if user doesn't exist
    // 1. hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 2. create user
    const user = await prisma.user.create({
        data: {
            name, 
            email, 
            password: hashedPassword,
            role
        }
    });
    return user;
}

export async function loginUser(data){
    const {email, password} = data;

    const user = await prisma.user.findUnique({ where: { email } });

    // if user not found
    if(!user) {
        throw new Error("Invalid credentials");
    }

    // if user is inactive
    if(!user.isActive) {
        throw new Error("User is inactive")
    }

    // when user exist
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
}
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtils";
import { CreateUserData } from "../utils/typeUtils";
import * as userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

async function findUserById(id:number) {
    const user = await userRepository.findById(id);
    if(!user){
        throw notFoundError("User not found");
    }

    return user;
}

async function createUser(user: CreateUserData) {

    const verifyUser = await userRepository.findUserEmail(user.email);
    if (verifyUser) {
        throw conflictError
    }

    const SALT = 10;
    const hashPassword = bcrypt.hashSync(user.password, SALT);
    await userRepository.insert({ ...user, password: hashPassword })

}

async function login(login: CreateUserData) {
    const user = await userRepository.findUserEmail(login.email);
    if (!user) {
        throw unauthorizedError("Invalid credentials");
    }

    const isPasswordValid = bcrypt.compareSync(login.password, user.password);
    if (!isPasswordValid) {
        throw unauthorizedError("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return token;
}

export const userService = {
    findUserById,
    createUser,
    login
}


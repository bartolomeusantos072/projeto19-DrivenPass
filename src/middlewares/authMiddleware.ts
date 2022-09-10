import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { unauthorizedError } from "../utils/errorUtils";
import { userService } from "../services/userService";

export async function name(req:Request,res:Response,next:NextFunction) {

    const authorization = req.headers["authorization"];
    if(!authorization){
        throw unauthorizedError("Authorization header is not present");
    }
    
    const token = authorization.replace("Bearer ","");
    if(!token){
        throw unauthorizedError("Token is not present")
    }

    try {
        const { userId } = jwt.verify(token,process.env.JWT_SECRET) as { userId: number };
        const user = await userService.findUserById(userId);
        res.locals.user = user;
        next();
      } catch {
        throw unauthorizedError("Invalid token");
      }
}
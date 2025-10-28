import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// function to genrate a token for user 
export const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token;
}
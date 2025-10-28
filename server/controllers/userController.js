import { TbPasswordUser } from "react-icons/tb";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

//  SignUp a new user

export const signup = async (req, res) => {
        const { fullName, email, password, bio } = req.body;

        try {
            if (!fullName || !email || !password || !bio) {
                return res.json({success: false, message : "All fields are required"})
            }
            const user = await User.findOne({email});

            if(user){
                return res.json({success: false, message: "Account already exists with this email"});
            }

            const salt = await bcrypt.gensalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                fullName, email, password: hashedPassword, bio
            })

            const token = generateToken(newUser._id);

            res.json({success: true, userData : newUser, token, message: "Account created successfully"});
        }
        catch (error) {
            console.log(error.message);
            // Handle error
            res.json({success: false, message: error.message});
        }
    }

// Login an existing user

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({email});

        const isPasswordMatch = await bcrypt.compare(password, userData.password);

        if(!userData || !isPasswordMatch){
            return res.json({success: false, message: "Invalid email or password"});
        }

        const token = generateToken(userData._id);
        res.json({success: true, userData, token, message: "Login successful"});
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message}); 
    }
};
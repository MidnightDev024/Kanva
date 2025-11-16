import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

//  SignUp a new user

export const signup = async (req, res) => {
        const { fullname, email, password, bio } = req.body;    // Debug: log incoming request body to help identify missing/renamed fields
    console.log('SIGNUP REQ BODY:', req.body);

        try {
            if (!fullname || !email || !password || !bio) {
                return res.json({success: false, message : "All fields are required"})
            }
            const user = await User.findOne({email});

            if(user){
                return res.json({success: false, message: "Account already exists with this email"});
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);


            const newUser = await User.create({
                fullname, email, password: hashedPassword, bio
            })

            // Debug: confirm user was created on the server
            console.log('User created:', newUser);

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

// controller to check if user is authenticated

export const checkAuth = async (req, res) => {
    res.json({success: true, user: req.user});
}

// controller to update user profile details

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullname } = req.body;
        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullname}, {new: true}); 
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullname}, {new: true});
        }
        res.json({success: true, userData: updatedUser});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message}); 
    }
}
import User from "./models/User.js";

//  SignUp a new user

export const signup = async (req, res) => {
        const { fullName, email, password, bio } = req.body;

        try {
            if (!fullName || !email || !password || !bio) {
                return res.json({success: false, message : "All fields are required"})
            }
            const uder = await User.findOne({email});

            
        }
        catch (error) {

        }
    }
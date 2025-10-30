// Get all users except the logged in user
import User from "../models/User";
import Message from "../models/Message";

export const getUsersForSidebar = async (req, res)=> {
    try {
        const userId = req.user._id
        const filteredUser = await User.find({ _id: { $ne: userId } }).select(-password);
        
        // count number of messages not seen from each user
        const unseenMessages = {}
        const promises = filteredUser.map(async (user) => {
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})
            if(messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }
        }) 
        await Promise.all(promises);
        res.json({success: true, users: filteredUser, unseenMessages})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}
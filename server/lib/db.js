import mongoose from 'mongoose';

// function to connect to MongoDB database

export const connectdb = async () => {
    try {
        
        mongoose.connection.on('connected', () => console.log('database connected'));
        
        await mongoose.connect(`${process.env.MONGO_URI}/chat-app`);
    }
    catch (error) {
        console.log(error);
    }
}
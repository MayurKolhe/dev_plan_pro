import mongoose from "mongoose";


export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("Error connecting to Database: ", error);
    }
};
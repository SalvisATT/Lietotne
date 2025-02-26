import mongoose from "mongoose";

export const connDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
    }catch (error){
        console.log("Server failed to connect", error)
        process.exit(1)
    }
}
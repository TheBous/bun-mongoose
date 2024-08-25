import mongoose from "mongoose";

const connect = async () => {
    if (!process.env.MONGO_URI) throw new Error("No connection string");
    console.info("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
}

export default connect;

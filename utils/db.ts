import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';

async function dbConnect() {
    if (!process.env.MONGO_URL || !process.env.MONGO_URL) {
        throw new Error(
            'Please define the SECRET_DATABASE_URL && SECRET_DATABASE_NAME environment variables.'
        );
    }

    const opts = {
        dbName: process.env.DB_NAME
    } as ConnectOptions;

    await mongoose.connect(process.env.MONGO_URL, opts);
    console.info(
        `Connected to MongoDB database: ${process.env.SECRET_DATABASE_NAME} in mode: ${process.env.NODE_ENV}`
    );
}
export default dbConnect;

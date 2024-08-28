import mongoose, { Schema } from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
);

export type Post = mongoose.InferSchemaType<typeof postSchema>;
export const Post = mongoose.model('Post', postSchema);
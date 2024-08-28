import { v4 as uuid4 } from 'uuid';
import { Post } from '../models/Post';

const postController = async (req: Request) => {
    if (req.method === "GET") {
        const url = new URL(req.url);
        const params = url.searchParams;

        const authorId = params.get("author_id");
        const postId = params.get("post_id");

        if (postId) {
            const post = await Post.findById(postId)
            if (!post) return Response.json({ success: false, data: "Post not found!" }, { status: 404 });

            return Response.json({ success: true, data: { post } });
        } else if (authorId) {
            const posts = await Post.find({ authorId });
            return Response.json({ success: true, data: { posts } });
        } else {
            return Response.json({ success: false, data: "Invalid query!" }, { status: 400 });
        }
    } else if (req.method === "POST") {
        const body = await req.json();
        const { title, content, authorId } = body;

        if (!title) return Response.json({ success: false, data: "Title is required!" }, { status: 400 });
        if (!content) return Response.json({ success: false, data: "Content is required!" }, { status: 400 });
        if (!authorId) return Response.json({ success: false, data: "Author ID is required!" }, { status: 400 });

        const postId = uuid4();

        const post = new Post({
            id: postId,
            title,
            content,
            authorId
        });

        await post.save();

        return Response.json({ success: true, data: "Post saved!" }, { status: 200 });
    } else {
        return Response.json({ success: false, data: "Method not allowed!" }, { status: 405 });
    }
};

export default postController;
import { v4 as uuid4 } from 'uuid';
import connect from "../utils/db";

const postController = async (req: Request) => {
    const db = connect();

    if (req.method === "GET") {
        const url = new URL(req.url);
        const params = url.searchParams;

        const authorId = params.get("author_id");
        const postId = params.get("post_id");

        if (postId) {
            const query = db.query("SELECT * FROM posts WHERE id = ?");
            const post = query.get(postId);
            if (!post) return Response.json({ success: false, data: "Post not found!" }, { status: 404 });

            return Response.json({ success: true, data: { post } });
        } else if (authorId) {
            const query = db.query("SELECT * FROM posts WHERE authorId = ?");
            const posts = query.all(authorId);
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

        const query = db.query("INSERT INTO posts (id, title, content, authorId) VALUES (?, ?, ?, ?)");
        query.run(postId, title, content, authorId);

        return Response.json({ success: true, data: "Post saved!" }, { status: 200 });
    } else {
        return Response.json({ success: false, data: "Method not allowed!" }, { status: 405 });
    }
};

export default postController;
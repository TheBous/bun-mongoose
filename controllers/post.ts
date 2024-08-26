import { v4 as uuid4 } from 'uuid';
import type { Post } from "../types";
import { InMemoryRepository } from "../utils/inMemoryDb";

const postController = async (req: Request) => {
    const repo = InMemoryRepository.getInstance();

    if (req.method === "GET") {
        const url = new URL(req.url);
        const params = url.searchParams;

        const authorId = params.get("author_id");
        const postId = params.get("post_id");

        if (postId) {
            const post = await repo.getPost(postId);
            if (!post) return new Response("Post not found!", { status: 404 });

            return Response.json({ success: true, data: { post } });
        } else if (authorId) {
            const posts = await repo.getPosts(authorId)
            return Response.json({ success: true, data: { posts } });
        } else return new Response("Invalid query!", { status: 400 });
    } else if (req.method === "POST") {
        const body = await req.json();
        const { title, content, authorId } = body;

        if (!title) return new Response("Title is required!", { status: 400 });
        if (!content) return new Response("Content is required!", { status: 400 });
        if (!authorId) return new Response("Author ID is required!", { status: 400 });

        const postId = uuid4();

        const newPost: Post = {
            id: postId,
            title,
            content,
            authorId
        };

        await repo.createPost(newPost);

        return Response.json({ success: true, data: "Post saved!" });
    } else {
        return new Response("Method not allowed!", { status: 405 });
    }
};

export default postController;
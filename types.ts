export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
}

export interface Repository {
    getUser(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    getPost(postId: string): Promise<Post | null>;
    getPosts(authorId: string): Promise<Post[]>;
    createPost(post: Post): Promise<Post>;
}
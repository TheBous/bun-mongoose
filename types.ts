export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}

export interface Repository {
    getUser(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    getPosts(authorId: number): Promise<Post[]>;
    createPost(post: Post): Promise<Post>;
}
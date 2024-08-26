import type { Post, Repository, User } from "../types";

export class InMemoryRepository implements Repository {
    private static instance: InMemoryRepository;
    private users: User[] = [];
    private posts: Post[] = [];

    private constructor() { }

    static getInstance(): InMemoryRepository {
        if (!InMemoryRepository.instance) {
            InMemoryRepository.instance = new InMemoryRepository();
        }
        return InMemoryRepository.instance;
    }

    async getUsers(): Promise<User[]> {
        return new Promise((resolve) => {
            resolve(this.users);
        })
    }
    async getUser(id: string): Promise<User | null> {
        return new Promise((resolve) => {
            const user = this.users.find((user) => user.id === id);
            resolve(user || null);
        })
    }

    async createUser(user: User): Promise<User> {
        return new Promise((resolve) => {
            const _users = this.users.concat(user);
            this.users = _users;
            resolve(user);
        });
    }

    async getPost(postId: string): Promise<Post | null> {
        return new Promise((resolve) => {
            const post = this.posts.find((post) => post.id === postId);
            resolve(post || null);
        });
    }

    async getPosts(authorId: string): Promise<Post[]> {
        return new Promise((resolve) => {
            const posts = this.posts.filter((post) => post.authorId === authorId);
            resolve(posts);
        });
    }

    async createPost(post: Post): Promise<Post> {
        return new Promise((resolve) => {
            const _posts = this.posts.concat(post);
            this.posts = _posts;
            resolve(post);
        })
    }
}
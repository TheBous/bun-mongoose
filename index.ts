import postController from "./controllers/post";
import userController from "./controllers/user";
import connect from "./utils/db";
import { InMemoryRepository } from "./utils/inMemoryDb";

await connect();

InMemoryRepository.getInstance();

const server = Bun.serve({
    port: 8080,
    async fetch(req) {
        const url = new URL(req.url);
        console.warn(url.pathname);
        if (url.pathname === "/") return new Response("Home page!");
        if (url.pathname === "/post") return await postController(req);
        if (url.pathname === "/user") return await userController(req);
        return new Response("404!");
    },
});

console.warn(`Listening on port ${server.port}`);
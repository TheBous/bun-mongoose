import animalController from "./controllers/animal";
import connect from "./utils/db";

await connect();

const server = Bun.serve({
    port: 8080,
    async fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response("Home page!");
        if (url.pathname === "/animal") return await animalController(req);
        return new Response("404!");
    },
});

console.warn(`Listening on port ${server.port}`);
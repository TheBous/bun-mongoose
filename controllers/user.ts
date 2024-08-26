import { v4 as uuid4 } from 'uuid';
import type { User } from "../types";
import { InMemoryRepository } from "../utils/inMemoryDb";

const userController = async (req: Request) => {
    const repo = InMemoryRepository.getInstance();

    if (req.method === "GET") {
        const url = new URL(req.url);
        const params = url.searchParams;

        const userId = params.get("user_id");

        if (userId) {
            const user = await repo.getUser(userId);
            if (!user) return Response.json({ success: false, error: "User not found!" }, { status: 404 });

            return Response.json({ success: true, data: { user } });
        } else {
            const users = await repo.getUsers()
            return Response.json({ success: true, data: { users } });
        }


    } else if (req.method === "POST") {
        const body = await req.json();
        const { name, email } = body;

        if (!name) return Response.json({ success: false, error: "Name is required!" }, { status: 400 });
        if (!email) return Response.json({ success: false, error: "Email is required!" }, { status: 400 });

        const userId = uuid4();

        const newUser: User = {
            id: userId,
            name,
            email,
        };

        await repo.createUser(newUser);

        return Response.json({ success: true, data: "User saved!" });
    } else {
        return Response.json({ success: false, error: "Method not allowed!" }, { status: 405 });
    }
};

export default userController;
import { Animal } from "../models/Animal";

const animalController = async (req: Request) => {
    if (req.method === "GET") {
        const animals = await Animal.find();
        console.info("All animals:", animals);
        return Response.json({ success: true, data: "Animal page!" });
    } else if (req.method === "POST") {
        const body = await req.json();
        const { name, sound } = body;
        if (!name) return new Response("Name is required!", { status: 400 });
        if (!sound) return new Response("Sound is required!", { status: 400 });

        const animal = new Animal({ name: "dog", sound: "woof" });
        await animal.save();
        console.info(`New animal saved with name: ${animal.name}`);

        return Response.json({ success: true, data: "Animal saved!" });
    } else {
        return new Response("Method not allowed!", { status: 405 });
    }
};

export default animalController;
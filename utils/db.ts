import { Database } from "bun:sqlite";

const connect = () => {
    if (!process.env.SQLITE_FILE) throw new Error("No database file specified");
    console.info("Connecting to SQLite...");
    const db = new Database(process.env.SQLITE_FILE);

    console.info("Connected to SQLite!");

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            authorId TEXT,
            FOREIGN KEY (authorId) REFERENCES users (id)
        )
    `);

    return db;
}

export default connect;
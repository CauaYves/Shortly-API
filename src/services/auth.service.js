import db from "../database/database.connection.js"

export async function checkIfUserExists(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
    return result.rowCount !== 0;
}

export async function createUser(name, email, password) {
    const query = `INSERT INTO users (name, email, password, createdat) VALUES ($1, $2, $3, to_timestamp($4));`;
    const timestamp = new Date().getTime();
    const values = [name, email, password, timestamp];
    await db.query(query, values);
}

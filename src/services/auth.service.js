import db from "../database/database.connection.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function checkIfUserExists(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
    if(result.rowCount === 0) return null
    return result.rows[0]
}
export async function createUser(name, email, password) {
    const query = `INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, to_timestamp($4));`

    const timestamp = new Date().getTime();
    const hashedPassword = await bcrypt.hash(password, 5)
    const values = [name, email, hashedPassword, timestamp]
    return await db.query(query, values)
}
export async function searchAllUsers() {
    return await db.query("SELECT * FROM users")
}
export async function searchUserByEmail(email) {
    const user = await db.query("SELECT * FROM users WHERE email = $1;", [email])
    return user.rows[0]
}
export async function createToken(userid, username) {
    const token = jwt.sign(userid, username)
    return token
}
export async function insertTokenOnDB(token, name) {
    const querystring = `UPDATE users SET "refreshToken" = $1 WHERE name = $2;`
    const answer = await db.query(querystring, [token, name])
    
}
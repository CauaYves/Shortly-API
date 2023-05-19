import { nanoid } from "nanoid"
import db from "../database/database.connection.js"

export async function checkToken(req) {
    const { authorization } = req.headers
    if (authorization === undefined) return null
}

export async function getNanoidById(nanoid) {
    const urls = await db.query("SELECT id, shorturl FROM urls WHERE shorturl = $1;", [nanoid]);
    if(urls.rowCount === 0) return null
    return urls.rows[0]
}
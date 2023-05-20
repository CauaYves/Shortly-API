import db from "../database/database.connection.js"
import jwt from "jsonwebtoken"

export async function checkToken(req) {
    const { authorization } = req.headers
    if (authorization === undefined) return null
}

export async function getNanoidById(nanoid) {
    const urls = await db.query("SELECT id, shorturl FROM urls WHERE shorturl = $1;", [nanoid]);
    if (urls.rowCount === 0) return null
    return urls.rows[0]
}

export async function getUrlDataById(id) {
    const answer = await db.query("SELECT id, shorturl, url FROM urls WHERE id = $1;", [id]);
    if (answer.rowCount === 0) return null
    return answer.rows[0]
}

export async function incrementVisitors(shorturl) {
    const query = "UPDATE urls SET visitcount = visitcount + 1 WHERE shorturl = $1 RETURNING url";
    const values = [shorturl];
    const res = await db.query(query, values)
    if (res.rowCount === 0) return null
    return res.rows[0].url
}

export async function getUrlUser(id) {
    const answer = await db.query("SELECT id, shorturl, url, userId FROM urls WHERE id = $1;", [id]);
    if (answer.rowCount === 0) return null
    return answer.rows[0]
}

export async function deleteUrlDatabaseById(id) {

    await db.query("DELETE FROM urls WHERE id = $1;",[id])

}
export async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, 'redflag');
        const { userId, name } = decoded;
        return { userId, name };
    } catch (error) {
        return null;
    }
}
